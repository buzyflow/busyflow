<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Prism\Tools\AddToCartTool;
use App\Prism\Tools\GetCartTool;
use App\Prism\Tools\GetProductsTool;
use App\Prism\Tools\PlaceOrderTool;
use App\Prism\Tools\RemoveFromCartTool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $validated = $request->validate([
            'prompt' => 'required|string',
            'customer_id' => 'nullable|string',
            'user_id' => 'required|string', // business owner ID for settings
        ]);

        // Get business owner (for bot settings)
        // If authenticated, use that user; otherwise use provided user_id
        $user = Auth::user() ?? \App\Models\User::find($validated['user_id']);

        if (! $user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Build system prompt from bot settings
        $systemPrompt = $this->buildSystemPrompt($user, $validated['customer_id']);

        // Store customer_id and vendor_id in request for tools to access
        $request->merge([
            '_customer_id' => $validated['customer_id'],
            '_vendor_id' => $user->id,
        ]);

        // Use Gemini provider (or any configured provider)
        $response = Prism::text()
            ->using(Provider::Gemini, 'gemini-2.0-flash')
            ->withMaxSteps(5) // allow tool calls
            ->withSystemPrompt($systemPrompt)
            ->withTools([
                new GetProductsTool(),
                new AddToCartTool(),
                new RemoveFromCartTool(),
                new GetCartTool(),
                new PlaceOrderTool(),
            ])
            ->withPrompt($validated['prompt'])
            ->asText();

        return response()->json(['response' => $response->text]);
    }

    private function buildSystemPrompt(\App\Models\User $user, ?string $customerId): string
    {
        $biz = $user->bot_settings ?? [];
        $businessDetails = $biz['business_details'] ?? [];

        // Extract values with defaults
        $botName = $biz['bot_name'] ?? 'Assistant';
        $address = $businessDetails['address'] ?? 'Not specified';
        $openingHours = $businessDetails['opening_hours'] ?? 'Not specified';
        $contactInfo = $businessDetails['contact_info'] ?? 'Not specified';
        $deliveryPolicy = $businessDetails['delivery_policy'] ?? 'Contact us for details';
        $customInstructions = $biz['custom_instructions'] ?? 'You are a helpful, friendly assistant. Help customers find products and place orders.';

        $customerContext = '';

        if ($customerId) {
            $customer = \App\Models\Customer::find($customerId);
            if ($customer) {
                $customerContext = "\n\nCURRENT CUSTOMER:\nYou are currently chatting with {$customer->name}. Address them by their name to make the conversation more personal and friendly.";
            }
        }

        // Build comprehensive system prompt
        return <<<PROMPT
You are '{$botName}', an AI assistant for a business called '{$user->business_name}'.

BUSINESS INFORMATION:
- Address: {$address}
- Opening Hours: {$openingHours}
- Contact: {$contactInfo}
- Policies: {$deliveryPolicy}{$customerContext}

CURRENCY FORMATTING:
When displaying prices, use the currency symbol from the product data:
- NGN = ₦ (Nigerian Naira)
- USD = $ (US Dollar)
- EUR = € (Euro)
- GBP = £ (British Pound)
- ZAR = R (South African Rand)
- KES = KSh (Kenyan Shilling)

Always format prices as: [symbol][amount] (e.g., ₦2,500 or $12.99)

Your Role & Personality:
{$customInstructions}

You have access to the following tools:
1. getProducts: Returns the full catalog of available products/services. Use this to show what's available or answer "what do you have?".
2. addToCart: Adds an item to the customer's cart. Requires item name (fuzzy match allowed) and quantity.
3. removeFromCart: Removes an item from the cart.
4. getCart: Lists current items in the cart and total.
5. placeOrder: Finalizes the order.

Guidelines:
- If a customer asks for a recommendation, ask about their preferences before checking the catalog.
- Always confirm when you've added or removed items.
- If the customer says "checkout" or "I'm done", show them the cart summary using getCart first, then ask for confirmation to placeOrder.
- Do NOT make up items that are not in the catalog.
- If asked about store hours or location, strictly use the BUSINESS INFORMATION provided above.
PROMPT;
    }
}
