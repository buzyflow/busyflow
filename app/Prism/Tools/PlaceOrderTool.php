<?php

namespace App\Prism\Tools;

use App\Models\Business;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Prism\Prism\Tool;

class PlaceOrderTool extends Tool
{
    public function __construct(public Business $business, public Customer $customer)
    {
        $this->as('placeOrder')
            ->for('Finalize and place the order for the customer. 

CRITICAL REQUIREMENTS:
1. You MUST collect complete delivery information before calling this function
2. You MUST validate that the address includes: street/house details, area/neighborhood, city, and state
3. You MUST confirm the full address with the customer and get their explicit confirmation
4. DO NOT call this function if the address is incomplete or unconfirmed

DELIVERY ADDRESS VALIDATION:
- Ensure the address is specific enough for delivery (not just a city name)
- Check that Nigerian state and city names are recognizable and valid
- If the address seems incomplete or unclear, ask the customer for more details
- Always repeat the complete address back to the customer before placing the order

Example of GOOD address: "123 Admiralty Way, Lekki Phase 1, Lagos, Lagos State"
Example of BAD address: "Lagos" or "Somewhere in Lekki"')
            ->withStringParameter('delivery_address', 'The COMPLETE delivery address including street number, street name, and area/neighborhood. Must be detailed and specific.')
            ->withStringParameter('delivery_city', 'The city for delivery (e.g., Lagos, Abuja, Port Harcourt). REQUIRED.')
            ->withStringParameter('delivery_state', 'The Nigerian state for delivery (e.g., Lagos State, FCT, Rivers State). REQUIRED.')
            ->withStringParameter('delivery_notes', 'Any special delivery instructions, landmarks, or notes to help locate the address (optional but recommended).', false)
            ->using($this);
    }

    public function __invoke(
        string $delivery_address,
        string $delivery_city,
        string $delivery_state,
        ?string $delivery_notes = null
    ): string {
        try {
            Log::info('PlaceOrderTool called', [
                'business_id' => $this->business->id,
                'customer_id' => $this->customer->id,
                'delivery_address' => $delivery_address,
                'delivery_city' => $delivery_city,
                'delivery_state' => $delivery_state,
            ]);

            $cartManager = new \App\Services\CartManager($this->business, $this->customer);
            $order = $cartManager->placeOrder(
                $delivery_address,
                $delivery_city,
                $delivery_state,
                $delivery_notes
            );

            Log::info('PlaceOrderTool: Order placed successfully', [
                'order_id' => $order->id,
                'order_number' => $order->order_number,
                'total' => $order->total,
            ]);

            return json_encode([
                'status' => 'success',
                'message' => "Order placed successfully! Your order number is {$order->order_number}. It will be delivered to {$delivery_address}, {$delivery_city}, {$delivery_state}.",
                'order_id' => $order->id,
                'order_number' => $order->order_number,
                'total' => $order->total,
                'currency' => $order->currency
            ]);
        } catch (\Exception $e) {
            Log::error('PlaceOrderTool: Exception occurred', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
}
