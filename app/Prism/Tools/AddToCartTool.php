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

        try {
            $cartManager = new \App\Services\CartManager($this->business, $this->customer);
            $result = $cartManager->addToCart($id, $quantity);

            Log::info('AddToCartTool: Product added successfully', [
                'product_id' => $result->product->id,
                'product_name' => $result->product->name,
                'quantity' => $quantity,
            ]);

            return json_encode([
                'status' => 'success',
                'message' => "Added {$quantity} × '{$result->product->name}' to cart.",
                'product' => [
                    'id' => $result->product->id,
                    'name' => $result->product->name,
                    'price' => $result->product->price,
                    'currency' => $result->product->currency
                ],
                'quantity_added' => $result->quantityAdded
            ]);
        } catch (\Exception $e) {
            Log::warning('AddToCartTool: Error adding to cart', [
                'product_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
}
