<?php

namespace App\Prism\Tools;

use App\Models\Cart;
use App\Models\Product;
use Prism\Prism\Tool;

class AddToCartTool extends Tool
{
    public function __construct()
    {
        $this->as('addToCart')
            ->for('Add a specific item to the customer\'s shopping cart.')
            ->withStringParameter('itemName', 'The name of the product to add.')
            ->withNumberParameter('quantity', 'The quantity to add (default 1).')
            ->using($this);
    }

    public function __invoke(string $itemName, int $quantity = 1)
    {
        // Get customer_id from request (set by ChatController)
        $customerId = request()->input('_customer_id');
        if (! $customerId) {
            return 'Error: No customer session. Please authenticate first.';
        }

        // Get vendor_id from request
        $vendorId = request()->input('_vendor_id');
        
        // Find product by name within this vendor's catalog
        $product = Product::where('user_id', $vendorId)
            ->where('name', 'LIKE', "%{$itemName}%")
            ->first();
            
        if (! $product) {
            return "Error: Product '{$itemName}' not found in catalog.";
        }

        // Get or create cart for this customer
        $cart = Cart::firstOrCreate(['customer_id' => $customerId]);

        // Check if item already exists in cart
        $cartItem = $cart->items()->where('product_id', $product->id)->first();
        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
                'currency' => $product->currency,
            ]);
        }

        return "Added {$quantity} x '{$product->name}' to cart.";
    }
}
