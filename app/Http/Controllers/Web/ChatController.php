<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Conversation;
use App\Models\Customer;
use App\Models\Message;
use App\Prism\Tools\AddToCartTool;
use App\Prism\Tools\GetCartTool;
use App\Prism\Tools\GetProductsTool;
use App\Prism\Tools\PlaceOrderTool;
use App\Prism\Tools\RemoveFromCartTool;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;
use Prism\Prism\ValueObjects\Messages\UserMessage;
use Prism\Prism\ValueObjects\Messages\AssistantMessage;
use Prism\Prism\ValueObjects\Messages\SystemMessage;


class ChatController extends Controller
{
    /**
     * Display the chat interface
     */
    public function index(Request $request)
    {
        $businessId = $request->query('business_id');
        
        if (!$businessId) {
            abort(404, 'Business not found');
        }
        
        $business = Business::with('bot')->findOrFail($businessId);
        
        if (!$business->bot || !$business->bot->active) {
            abort(404, 'Bot not available');
        }
        
        return Inertia::render('Chat/Index', [
            'business' => $business,
            'bot' => $business->bot,
        ]);
    }

    /**
     * Authenticate customer and start/resume conversation
     */
    public function start(Request $request)
    {
        $validated = $request->validate([
            'business_id' => 'required|exists:businesses,id',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ]);

        $business = Business::findOrFail($validated['business_id']);

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

        // Update name if changed
        if ($customer->name !== $validated['name']) {
            $customer->update(['name' => $validated['name']]);
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

        // Load conversation history
        $messages = $conversation->messages()
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($message) {
                return [
                    'id' => $message->id,
                    'role' => $message->role,
                    'content' => $message->content,
                    'created_at' => $message->created_at->toIso8601String(),
                ];
            });

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

        $conversation = Conversation::with(['customer', 'business.bot', 'messages'])
            ->findOrFail($validated['conversation_id']);

        if (!$conversation->business->bot || !$conversation->business->bot->active) {
            return response()->json(['error' => 'Bot not available'], 400);
        }

        // Save user message
        $userMessage = Message::create([
            'conversation_id' => $conversation->id,
            'role' => 'user',
            'content' => $validated['message'],
        ]);

        // Build system prompt with bot persona and customer context
        $bot = $conversation->business->bot;
        $customer = $conversation->customer;
        $business = $conversation->business;
        
        $systemPrompt = <<<PROMPT
You are '{$bot->name}', a helpful assistant for {$business->name}.

PERSONA: {$bot->persona}
TONE: {$bot->tone}

CUSTOMER INFORMATION:
You are currently chatting with {$customer->name} (Phone: {$customer->phone}).
Address them by their name to make the conversation more personal and friendly.

CURRENCY FORMATTING:
When displaying prices, use the currency symbol from the product data:
- NGN = ₦ (Nigerian Naira)
- USD = $ (US Dollar)
- EUR = € (Euro)
- GBP = £ (British Pound)

Always format prices as: [symbol][amount] (e.g., ₦2,500 or \$12.99)

YOUR TOOLS:
You have access to the following tools to help customers:

1. getProducts: Returns the full catalog of available products/services. 
   - Use this when customers ask "what do you have?", "show me your menu", "what products are available?"
   
2. addToCart: Adds an item to the customer's cart.
   - Parameters: itemName (required), quantity (optional, defaults to 1)
   - Use this when customers say things like "I want a pizza", "add 2 burgers to my cart", "I'll take 3 of those"
   - The itemName supports fuzzy matching, so you don't need exact product names
   
3. removeFromCart: Removes an item from the cart.
   - Parameters: itemName (required)
   - Use when customers say "remove the pizza", "take out the burger"
   
4. getCart: Shows current cart contents and total.
   - Use when customers ask "what's in my cart?", "show me my cart", "what have I ordered?"
   
5. placeOrder: Finalizes and places the order.
   - Use when customers say "checkout", "place my order", "I'm done", "complete my order"
   - ALWAYS show the cart summary first using getCart before placing the order

GUIDELINES:
- If a customer asks for recommendations, ask about their preferences before checking the catalog
- Always confirm when you've added or removed items
- If the customer says "checkout" or "I'm done", show them the cart summary using getCart first, then ask for confirmation to placeOrder
- Do NOT make up items that are not in the catalog
- Use the tools available to you - they are there to help you assist customers effectively
- Be conversational and friendly while using the tools naturally in your responses
PROMPT;

        // Store customer_id and business_id in request for tools to access
        $request->merge([
            '_customer_id' => $customer->id,
            '_business_id' => $business->id,
        ]);

        try {
            // Use Prism to generate response (matching API implementation)
            $response = Prism::text()
                ->using(Provider::Gemini, 'gemini-2.0-flash')
                ->withMaxSteps(5)
                ->withSystemPrompt($systemPrompt)
                ->withTools([
                    new GetProductsTool(),
                    new AddToCartTool(),
                    new RemoveFromCartTool(),
                    new GetCartTool(),
                    new PlaceOrderTool(),
                ])
                ->withPrompt($validated['message'])
                ->asText();

            $aiContent = $response->text;

            // Save AI response
            $aiMessage = Message::create([
                'conversation_id' => $conversation->id,
                'role' => 'assistant',
                'content' => $aiContent,
            ]);

            return response()->json([
                'success' => true,
                'message' => [
                    'id' => $aiMessage->id,
                    'role' => 'assistant',
                    'content' => $aiContent,
                    'created_at' => $aiMessage->created_at->toIso8601String(),
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate response',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
