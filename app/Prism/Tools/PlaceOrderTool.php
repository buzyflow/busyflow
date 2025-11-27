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

        // Get vendor_id from request
        $vendorId = request()->input('_vendor_id');

        // Wrap in transaction
        return DB::transaction(function () use ($customerId, $cart, $vendorId) {
            $order = Order::create([
                'customer_id' => $customerId,
                'vendor_id' => $vendorId,
                'status' => 'pending',
            ]);
            $total = 0;
            $currency = 'NGN';
            foreach ($cart->items as $cartItem) {
                $order->items()->create([
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price,
                    'currency' => $cartItem->currency,
                ]);
                $total += $cartItem->price * $cartItem->quantity;
                $currency = $cartItem->currency;
            }
            $order->update(['total' => $total, 'currency' => $currency]);
            // Clear cart
            $cart->items()->delete();

            return "Order placed successfully! Order ID: #{$order->id}. Total: {$currency} {$total}. We'll process it shortly.";
        });
    }
}
