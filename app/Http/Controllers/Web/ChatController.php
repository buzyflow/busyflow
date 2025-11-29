<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Conversation;
use App\Models\Customer;
use App\Prism\Tools\AddToCartTool;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use App\Prism\Tools\GetCartTool;
use App\Prism\Tools\GetProductsTool;
use App\Prism\Tools\PlaceOrderTool;
use App\Prism\Tools\RemoveFromCartTool;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use PDO;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;
use Prism\Prism\Text\PendingRequest;
use Prism\Prism\ValueObjects\Messages\UserMessage;
use Prism\Prism\ValueObjects\Messages\AssistantMessage;
use Prism\Prism\ValueObjects\Messages\SystemMessage;


class ChatController extends Controller
{
    /**
     * Display the chat interface
     */
    public function index(Request $request, Business $business)
    {
        if (!$business->bot || !$business->bot->active) {
            abort(404, 'Bot not available');
        }

        // Check if customer is already authenticated
        $customer = Auth::guard('customer')->user();
        $conversation = null;

        if ($customer && $customer->business_id === $business->id) {
            // Get active conversation for this customer
            $conversation = Conversation::where('business_id', $business->id)
                ->where('customer_id', $customer->id)
                ->where('status', 'active')
                ->first();
        }

        if (! $customer) {
            return Inertia::render('Chat/Form', [
                'business' => $business,
                'bot' => $business->bot,
            ]);
        }

        return Inertia::render('Chat/Index', [
            'business' => $business,
            'bot' => $business->bot,
            'customer' => $customer ? [
                'id' => $customer->id,
                'name' => $customer->name,
                'phone' => $customer->phone,
            ] : null,
            'conversation_id' => $conversation?->id,
        ]);
    }

    /**
     * Authenticate customer and start/resume conversation
     */
    public function start(Request $request, Business $business)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ]);

        // Find or create customer
        $customer = Customer::firstOrCreate(
            [
                'business_id' => $business->id,
                'phone' => $validated['phone'],
            ],
            [
                'name' => $validated['name'],
                'last_active' => now(),
            ]
        );

        //@todo: Update name if changed -> might be needed in the future
        // if ($customer->name !== $validated['name']) {
        //     $customer->update(['name' => $validated['name']]);
        // }

        // Update last active
        $customer->update(['last_active' => now()]);

        // Authenticate the customer using the customer guard
        Auth::guard('customer')->login($customer);

        // Find or create active conversation
        $conversation = Conversation::firstOrCreate(
            [
                'business_id' => $business->id,
                'customer_id' => $customer->id,
                'status' => 'active',
            ]
        );

        // Load conversation history from Cache
        $cacheKey = "conversation:{$conversation->id}:messages";
        $messages = Cache::get($cacheKey, []);

        return redirect()->route('business.chat.index', $business);
    }

    public function messages(Business $business)
    {
        /** @var Customer $customer */
        $customer = Auth::guard('customer')->user();

        if (! $customer) {
            return response(status: Response::HTTP_UNAUTHORIZED);
        }

        // Update last active
        $customer->update(['last_active' => now()]);

        // Find or create active conversation
        $conversation = Conversation::firstOrCreate(
            [
                'business_id' => $business->id,
                'customer_id' => $customer->id,
                'status' => 'active',
            ]
        );

        // Load conversation history from Cache
        $cacheKey = "conversation:{$conversation->id}:messages";
        $messages = Cache::get($cacheKey, []);

        return response()->json([
            'success' => true,
            'conversation_id' => $conversation->id,
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'phone' => $customer->phone,
            ],
            'messages' => $messages,
        ]);
    }

    /**
     * Send message and get AI response
     */
    public function send(Request $request)
    {
        $validated = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'message' => 'required|string',
        ]);

        $conversation = Conversation::with(['customer', 'business.bot'])
            ->findOrFail($validated['conversation_id']);

        if (!$conversation->business->bot || !$conversation->business->bot->active) {
            return response()->json(['error' => 'Bot not available'], 400);
        }

        $bot = $conversation->business->bot;
        $customer = $conversation->customer;
        $business = $conversation->business;

        // Get messages from Cache
        $cacheKey = "conversation:{$conversation->id}:messages";
        $messages = Cache::get($cacheKey, []);

        // Add user message to cache
        $userMessage = [
            'role' => 'user',
            'content' => $validated['message'],
            'created_at' => now()->toIso8601String(),
        ];
        $messages[] = $userMessage;

        // Build system prompt
        $systemPrompt = view('prompts.chat-system', [
            'bot' => $bot,
            'business' => $business,
            'customer' => $customer,
        ])->render();

        // Take last 20 messages for context (avoid huge context)
        $recentMessages = array_slice($messages, -20);

        // Convert to Prism format
        $prismMessages = [];
        foreach ($recentMessages as $msg) {
            if ($msg['role'] === 'user') {
                $prismMessages[] = new UserMessage($msg['content']);
            } else {
                $prismMessages[] = new AssistantMessage($msg['content']);
            }
        }

        try {
            $response = Prism::text()
                ->using(Provider::Gemini, 'gemini-2.5-flash-lite')
                ->withMaxSteps(5)
                ->withoutToolErrorHandling()
                ->withTools([
                    new GetProductsTool($business),
                    new AddToCartTool($business, $customer),
                    new RemoveFromCartTool($business, $customer),
                    new GetCartTool($business, $customer),
                    new PlaceOrderTool($business, $customer),
                ])
                ->withSystemPrompt($systemPrompt)
                ->withMessages($prismMessages)
                ->asText();

            $aiContent = $response->text;

            // Add AI response to cache
            $aiMessage = [
                'role' => 'assistant',
                'content' => $aiContent,
                'created_at' => now()->toIso8601String(),
            ];
            $messages[] = $aiMessage;

            // Store updated messages in Cache with 24-hour expiration
            Cache::put($cacheKey, $messages, now()->addHours(24));

            return response()->json([
                'success' => true,
                'message' => $aiMessage,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate response',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get customer's cart
     */
    public function getCart(Request $request, Business $business)
    {
        /** @var \App\Models\Customer $customer */
        $customer = Auth::guard('customer')->user();

        if (!$customer) {
            return response()->json([
                'success' => false,
                'error' => 'Not authenticated',
            ], 401);
        }

        $cartManager = new \App\Services\CartManager($business, $customer);
        $summary = $cartManager->getCartSummary();

        return response()->json([
            'success' => true,
            'items' => $summary->items->map(fn($item) => $item->toArray()),
            'total' => $summary->total,
            'currency' => $summary->currency,
        ]);
    }
}
