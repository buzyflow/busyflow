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

    public function __invoke(string $query = ''): array
    {
        Log::info('GetProductsTool called with query: ' . $query);
        $products = Product::query()
            ->where('business_id', $this->business->id)
            ->when($query, fn($q) => $q->where('name', 'like', "%{$query}%"))
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
            ->map(fn($p) => [
                'id'          => $p->id,
                'name'        => $p->name,
                'price'       => $p->price,
                'currency'    => $p->currency,
                'category'    => $p->category,
                'description' => $p->description,
                'image'       => $p->image,
                'available'   => $p->stock > 0,
            ])
            ->toArray();

        Log::info('GetProductsTool returning products: ', [
            'products' => $products,
            'count' => count($products),
        ]);

        return [
            'products' => $products,
            'count' => count($products),
        ];
    }
}
