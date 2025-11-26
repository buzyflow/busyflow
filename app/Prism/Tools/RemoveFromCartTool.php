<?php

namespace App\Prism\Tools;

use App\Models\Cart;
use App\Models\Product;
use Prism\Prism\Tool;

class RemoveFromCartTool extends Tool
{
    public function __construct()
    {
        $this->as('removeFromCart')
            ->for('Remove an item from the customer\'s shopping cart.')
            ->withStringParameter('itemName', 'The name of the product to remove.')
            ->using($this);
    }

    public function __invoke(string $itemName)
    {
        // Get customer_id from request (set by ChatController)
        $customerId = request()->input('_customer_id');
        if (! $customerId) {
            return 'Error: No customer session. Please authenticate first.';
        }

        // Find product by name (fuzzy match)
        $product = Product::where('name', 'LIKE', "%{$itemName}%")->first();
        if (! $product) {
            return "Error: Product '{$itemName}' not found in catalog.";
        }

        $cart = Cart::where('customer_id', $customerId)->first();
        if (! $cart) {
            return 'Error: Cart is empty.';
        }

        $cartItem = $cart->items()->where('product_id', $product->id)->first();
        if (! $cartItem) {
            return "Error: '{$product->name}' is not in your cart.";
        }

        $cartItem->delete();

        return "Removed '{$product->name}' from cart.";
    }
}
