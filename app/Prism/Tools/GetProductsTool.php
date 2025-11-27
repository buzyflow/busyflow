<?php

namespace App\Prism\Tools;

use App\Models\Product;
use Prism\Prism\Tool;

class GetProductsTool extends Tool
{
    public function __construct()
    {
        $this->as('getProducts')
            ->for('Get the full catalog of products/services with details like id, name, price, currency, description.')
            ->using($this);
    }

    public function __invoke()
    {
        // Get business_id from request (set by ChatController)
        $businessId = request()->input('_business_id');
        if (! $businessId) {
            return json_encode(['error' => 'No business context available']);
        }

        $products = Product::where('business_id', $businessId)->get();

        // Return JSON string of products with relevant fields
        return $products->map(function ($p) {
            return [
                'id' => $p->id,
                'name' => $p->name,
                'description' => $p->description,
                'price' => $p->price,
                'currency' => $p->currency,
                'category' => $p->category,
            ];
        })->toJson();
    }
}
