<?php

namespace App\Prism\Tools;

use App\Models\Business;
use App\Models\Customer;
use App\Models\Order;
use Prism\Prism\Tool;

class PlaceOrderTool extends Tool
{
    public function __construct(public Business $business, public Customer $customer)
    {
        $this->as('placeOrder')
            ->for('Finalize and place the order for the customer.')
            ->using($this);
    }

    public function __invoke()
    {
        // Pull the correct cart for this business
        $cart = $this->customer
            ->carts()
            ->where('business_id', $this->business->id)
            ->first();

        if (! $cart || $cart->items()->count() === 0) {
            return json_encode([
                'status' => 'error',
                'message' => 'Cart is empty. Please add items before placing an order.'
            ]);
        }

        $customer = $this->customer;
        $orderItems = [];
        $total = 0;
        $currency = 'NGN';

        // Build item list
        $items = $cart->items()->with('product')->get();

        foreach ($items as $cartItem) {
            $orderItems[] = [
                'product_id'   => $cartItem->product_id,
                'product_name' => $cartItem->product->name,
                'quantity'     => $cartItem->quantity,
                'price'        => $cartItem->price,
                'currency'     => $cartItem->currency,
                'line_total'   => $cartItem->price * $cartItem->quantity,
            ];

            $total += $cartItem->price * $cartItem->quantity;
            $currency = $cartItem->currency;
        }

        // Create order record
        $order = Order::create([
            'customer_id'    => $customer->id,
            'business_id'    => $this->business->id,
            'customer_name'  => $customer->name,
            'customer_phone' => $customer->phone,
            'items'          => $orderItems,
            'total'          => $total,
            'currency'       => $currency,
            'status'         => 'pending',
            'order_timestamp' => now()->timestamp,
        ]);

        // Clear cart after order
        $cart->items()->delete();

        return json_encode([
            'status' => 'success',
            'message' => 'Order placed successfully!',
            'order_id' => $order->id,
            'total' => $total,
            'currency' => $currency
        ]);
    }
}
