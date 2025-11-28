<?php

namespace App\Prism\Tools;

use App\Models\Business;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Prism\Prism\Tool;

class AddToCartTool extends Tool
{
    public function __construct(protected Business $business, protected Customer $customer)
    {
        $this->as('addToCart')
            ->for('Add a specific item to the customer\'s shopping cart. You MUST use the product ID from the catalog, not the product name.')
            ->withStringParameter('product_id', 'The numeric ID of the product from the catalog (e.g., "9" for product with id 9). This is REQUIRED.')
            ->withNumberParameter('quantity', 'The quantity to add. Defaults to 1 if not specified.')
            ->using($this);
    }

    public function __invoke(string|int $product_id, int $quantity = 1)
    {
        // Log the input
        Log::info('AddToCartTool called', [
            'product_id' => $product_id,
            'quantity' => $quantity,
            'business_id' => $this->business->id,
            'customer_id' => $this->customer->id,
        ]);

        // Normalize inputs
        $id = (int) $product_id;
        $quantity = max(1, (int) $quantity); // prevent zero/negative

        // Get product that belongs to this business
        $product = Product::where('business_id', $this->business->id)
            ->where('id', $id)
            ->first();

        if (! $product) {
            Log::warning('AddToCartTool: Product not found', [
                'product_id' => $id,
                'business_id' => $this->business->id,
            ]);

            return json_encode([
                'status' => 'error',
                'message' => "Product with ID {$id} not found in catalog. Please use the exact product ID from the getProducts tool."
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

        Log::info('AddToCartTool: Product added successfully', [
            'product_id' => $product->id,
            'product_name' => $product->name,
            'quantity' => $quantity,
        ]);

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
