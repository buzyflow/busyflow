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

        try {
            $cartManager = new \App\Services\CartManager($this->business, $this->customer);
            $result = $cartManager->removeFromCart($productId);

            return json_encode([
                'status' => 'success',
                'message' => "Removed '{$result->product->name}' from cart.",
                'product' => [
                    'id' => $result->product->id,
                    'name' => $result->product->name
                ]
            ]);
        } catch (\Exception $e) {
            return json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
}
