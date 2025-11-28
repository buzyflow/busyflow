<?php

namespace App\Prism\Tools;

use App\Models\Business;
use App\Models\Customer;
use Prism\Prism\Tool;

class RemoveFromCartTool extends Tool
{
    public function __construct(protected Business $business, protected Customer $customer)
    {
        $this->as('removeFromCart')
            ->for('Remove an item from the customer\'s shopping cart.')
            ->withStringParameter('id', 'The id of the product to remove.')
            ->using($this);
    }

    public function __invoke(string $id)
    {
        $productId = (int) $id;

        // Verify product belongs to this business
        $product = $this->business->products()->where('id', $productId)->first();
        if (! $product) {
            return json_encode([
                'status' => 'error',
                'message' => 'Product not found in this business catalog.'
            ]);
        }

        // Fetch the cart for this business
        $cart = $this->customer
            ->carts()
            ->where('business_id', $this->business->id)
            ->first();

        if (! $cart) {
            return json_encode([
                'status' => 'error',
                'message' => 'Cart is empty.'
            ]);
        }

        // Check if product is in cart
        $cartItem = $cart->items()->where('product_id', $product->id)->first();
        if (! $cartItem) {
            return json_encode([
                'status' => 'error',
                'message' => 'Product is not in your cart.'
            ]);
        }

        // Remove from cart
        $cartItem->delete();

        return json_encode([
            'status' => 'success',
            'message' => "Removed '{$product->name}' from cart.",
            'product' => [
                'id' => $product->id,
                'name' => $product->name
            ]
        ]);
    }
}
