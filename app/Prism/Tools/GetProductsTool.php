<?php

namespace App\Prism\Tools;

use App\Models\Business;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Prism\Prism\Tool;

class GetProductsTool extends Tool
{
    public function __construct(protected Business $business)
    {
        $this->as('getProducts')
            ->for('Return a list of available products for this business. Use this when the user asks about products, prices, catalog, categories, or available items.')
            ->withStringParameter('query', 'Optional search keyword. Use this only when the user is looking for something specific.', false)
            ->using($this);
    }

    public function __invoke(string $query = ''): string
    {
        $products = Product::query()
            ->where('business_id', $this->business->id)
            ->when(filled($query), fn($q) => $q->where('name', 'like', "%{$query}%"))
            ->limit(50) // Prevent huge context
            ->get([
                'id',
                'name',
                'price',
                'currency',
                'description',
                'category',
                'image',
                'stock',
            ])
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $product->price,
                    'currency' => $product->currency,
                    'category' => $product->category,
                    'image' => $product->image,
                    'available' => $product->stock > 0,
                ];
            })
            ->toArray();

        $result = [
            'products' => $products,
            'count' => count($products),
        ];

        Log::info('GetProductsTool returning products: ', $result);

        return json_encode($result);
    }
}
