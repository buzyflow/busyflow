<?php

namespace App\Prism\Tools;

use App\Models\Cart;
use Prism\Prism\Tool;

class GetCartTool extends Tool
{
    public function __construct()
    {
        $this->as('getCart')
            ->for('Get the current status of the cart, including items and total price.')
            ->using($this);
    }

    public function __invoke()
    {
        // Get customer_id from request (set by ChatController)
        $customerId = request()->input('_customer_id');
        if (! $customerId) {
            return json_encode(['items' => [], 'total' => 0, 'currency' => 'USD', 'message' => 'No customer session']);
        }

        $cart = Cart::where('customer_id', $customerId)->first();
        if (! $cart || $cart->items()->count() === 0) {
            return json_encode(['items' => [], 'total' => 0, 'currency' => 'USD', 'message' => 'Cart is empty']);
        }

        $items = $cart->items()->with('product')->get()->map(function ($item) {
            return [
                'product' => $item->product->name,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'currency' => $item->currency,
            ];
        })->toArray();
        $total = array_reduce($items, fn ($carry, $i) => $carry + ($i['price'] * $i['quantity']), 0);

        return json_encode(['items' => $items, 'total' => $total, 'currency' => $items[0]['currency'] ?? 'USD']);
    }
}
