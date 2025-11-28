<?php

namespace App\Prism\Tools;

use App\Models\Business;
use App\Models\Customer;
use Prism\Prism\Tool;

class GetCartTool extends Tool
{
    public function __construct(public Business $business, public Customer $customer)
    {
        $this->as('getCart')
            ->for('Get the current status of the cart, including items and total price.')
            ->using($this);
    }

    public function __invoke()
    {
        // Correct: fetch cart for THIS business only
        $cart = $this->customer
            ->carts()
            ->where('business_id', $this->business->id)
            ->first();

        if (! $cart || $cart->items()->count() === 0) {
            return json_encode([
                'status' => 'empty',
                'items' => [],
                'total' => 0,
                'currency' => 'NGN',
                'message' => 'Cart is empty'
            ]);
        }

        // Load items with product data
        $items = $cart->items()
            ->with('product')
            ->get()
            ->map(function ($item) {
                return [
                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'price' => $item->product->price,
                        'currency' => $item->product->currency,
                        'image' => $item->product->image,
                    ],
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'line_total' => $item->price * $item->quantity,
                ];
            })->toArray();

        $total = array_reduce($items, fn($carry, $i) => $carry + $i['line_total'], 0);
        $currency = $items[0]['product']['currency'] ?? 'NGN';

        return json_encode([
            'status' => 'success',
            'items' => $items,
            'total' => $total,
            'currency' => $currency
        ]);
    }
}
