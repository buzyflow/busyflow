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

        $cartManager = new \App\Services\CartManager($this->business, $this->customer);
        $summary = $cartManager->getCartSummary();

        if ($summary->items->isEmpty()) {
            Log::info('GetCartTool: Cart is empty');
            return json_encode([
                'status' => 'success',
                'message' => 'Cart is empty.',
                'items' => [],
                'total' => 0,
                'currency' => 'NGN'
            ]);
        }

        // Format items for the tool response
        $formattedItems = $summary->items->map(function ($item) {
            return [
                'product_id' => $item->productId,
                'product_name' => $item->productName,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'currency' => $item->currency,
                'line_total' => $item->subtotal,
            ];
        });

        Log::info('GetCartTool: Cart retrieved', [
            'items_count' => $summary->count,
            'total' => $summary->total,
        ]);

        return json_encode([
            'status' => 'success',
            'items' => $formattedItems,
            'total' => $summary->total,
            'currency' => $summary->currency
        ]);
    }
}
