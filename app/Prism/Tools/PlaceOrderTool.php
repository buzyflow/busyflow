<?php

namespace App\Prism\Tools;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Prism\Prism\Tool;

class PlaceOrderTool extends Tool
{
    public function __construct()
    {
        $this->as('placeOrder')
            ->for('Finalize and place the order for the customer.')
            ->using($this);
    }

    public function __invoke()
    {
        // Get customer_id from request (set by ChatController)
        $customerId = request()->input('_customer_id');
        if (! $customerId) {
            return 'Error: No customer session. Please authenticate first.';
        }

        $cart = Cart::where('customer_id', $customerId)->first();
        if (! $cart || $cart->items()->count() === 0) {
            return 'Error: Cart is empty. Please add items before placing an order.';
        }

        // Get business_id from request
        $businessId = request()->input('_business_id');

        // Get customer for order details
        $customer = \App\Models\Customer::find($customerId);

        // Build items array and calculate total
        $orderItems = [];
        $total = 0;
        $currency = 'NGN';

        foreach ($cart->items()->with('product')->get() as $cartItem) {
            $orderItems[] = [
                'product_id' => $cartItem->product_id,
                'product_name' => $cartItem->product->name,
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->price,
                'currency' => $cartItem->currency,
            ];
            $total += $cartItem->price * $cartItem->quantity;
            $currency = $cartItem->currency;
        }

        // Create order with items as JSON
        $order = Order::create([
            'customer_id' => $customerId,
            'business_id' => $businessId,
            'customer_name' => $customer->name,
            'customer_phone' => $customer->phone,
            'items' => $orderItems,
            'total' => $total,
            'currency' => $currency,
            'status' => 'pending',
            'order_timestamp' => now()->timestamp,
        ]);

        // Clear cart
        $cart->items()->delete();

        return "Order placed successfully! Order ID: #{$order->id}. Total: {$currency} {$total}. We'll process it shortly.";
    }
}
