<?php

namespace App\Prism\Tools;

use App\Models\Business;
use App\Models\Customer;
use Illuminate\Support\Facades\Log;
use Prism\Prism\Tool;

class GetCartTool extends Tool
{
    public function __construct(protected Business $business, protected Customer $customer)
    {
        $this->as('getCart')
            ->for('Get the current shopping cart contents for the customer.')
            ->using($this);
    }

    public function __invoke(): string
    {
        Log::info('GetCartTool called', [
            'business_id' => $this->business->id,
            'customer_id' => $this->customer->id,
        ]);

        // Get cart for this specific business
        $cart = $this->customer
            ->carts()
            ->where('business_id', $this->business->id)
            ->first();

        if (! $cart || $cart->items()->count() === 0) {
            Log::info('GetCartTool: Cart is empty');
            return json_encode([
                'status' => 'success',
                'message' => 'Cart is empty.',
                'items' => [],
                'total' => 0,
                'currency' => 'NGN'
            ]);
        }

        $items = $cart->items()->with('product')->get();
        $cartItems = [];
        $total = 0;
        $currency = 'NGN';

        foreach ($items as $cartItem) {
            $lineTotal = $cartItem->price * $cartItem->quantity;
            $cartItems[] = [
                'product_id' => $cartItem->product_id,
                'product_name' => $cartItem->product->name,
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->price,
                'currency' => $cartItem->currency,
                'line_total' => $lineTotal,
            ];

            $total += $lineTotal;
            $currency = $cartItem->currency;
        }

        Log::info('GetCartTool: Cart retrieved', [
            'items_count' => count($cartItems),
            'total' => $total,
        ]);

        return json_encode([
            'status' => 'success',
            'items' => $items,
            'total' => $total,
            'currency' => $currency
        ]);
    }
}
