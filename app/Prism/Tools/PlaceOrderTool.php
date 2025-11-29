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
            ->for('Finalize and place the order for the customer.')
            ->using($this);
    }

    public function __invoke(): string
    {
        try {
            Log::info('PlaceOrderTool called', [
                'business_id' => $this->business->id,
                'customer_id' => $this->customer->id,
            ]);

            $cartManager = new \App\Services\CartManager($this->business, $this->customer);
            $order = $cartManager->placeOrder();

            Log::info('PlaceOrderTool: Order placed successfully', [
                'order_id' => $order->id,
                'order_number' => $order->order_number,
                'total' => $order->total,
            ]);

            return json_encode([
                'status' => 'success',
                'message' => "Order placed successfully! Your order number is {$order->order_number}.",
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
