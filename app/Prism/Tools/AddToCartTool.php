<?php

namespace App\Prism\Tools;

use App\Models\Business;
use App\Models\Customer;
use App\Models\Product;
use Prism\Prism\Tool;

class AddToCartTool extends Tool
{
    public function __construct(protected Business $business, protected Customer $customer)
    {
        $this->as('addToCart')
            ->for('Add a specific item to the customer\'s shopping cart.')
            ->withStringParameter('id', 'The id of the product to add.')
            ->withNumberParameter('quantity', 'The quantity to add. Defaults to 1 if not specified.')
            ->using($this);
    }

    public function __invoke(string|int $id, int $quantity = 1)
    {
        // Normalize inputs
        $id = (int) $id;
        $quantity = max(1, (int) $quantity); // prevent zero/negative

        // Get product that belongs to this business
        $product = Product::where('business_id', $this->business->id)
            ->where('id', $id)
            ->first();

        if (! $product) {
            return json_encode([
                'status' => 'error',
                'message' => 'Product not found in catalog.'
            ]);
        }

        // Get or create cart for this customer for THIS specific business
        $cart = $this->customer
            ->carts()
            ->firstOrCreate(['business_id' => $this->business->id]);

        // Check if item already exists
        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $quantity);
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
                'currency' => $product->currency,
            ]);
        }

        return json_encode([
            'status' => 'success',
            'message' => "Added {$quantity} × '{$product->name}' to cart.",
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'currency' => $product->currency
            ],
            'quantity_added' => $quantity
        ]);
    }
}
