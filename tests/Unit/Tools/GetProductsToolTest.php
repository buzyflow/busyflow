<?php

use App\Models\Business;
use App\Models\Product;
use App\Prism\Tools\GetProductsTool;

test('get products tool returns all products for business', function () {
    $business = createBusiness();
    $product1 = createProduct($business, ['name' => 'Widget']);
    $product2 = createProduct($business, ['name' => 'Gadget']);

    $tool = new GetProductsTool($business);
    $result = json_decode($tool(''), true);

    expect($result)->toHaveKey('products')
        ->and($result)->toHaveKey('count')
        ->and($result['count'])->toBe(2)
        ->and($result['products'])->toHaveCount(2);
});

test('get products tool filters by query', function () {
    $business = createBusiness();
    createProduct($business, ['name' => 'Red Widget']);
    createProduct($business, ['name' => 'Blue Gadget']);

    $tool = new GetProductsTool($business);
    $result = json_decode($tool('Widget'), true);

    expect($result['count'])->toBe(1)
        ->and($result['products'][0]['name'])->toBe('Red Widget');
});

test('get products tool only returns products for specific business', function () {
    $business1 = createBusiness();
    $business2 = createBusiness();

    createProduct($business1, ['name' => 'Business 1 Product']);
    createProduct($business2, ['name' => 'Business 2 Product']);

    $tool = new GetProductsTool($business1);
    $result = json_decode($tool(''), true);

    expect($result['count'])->toBe(1)
        ->and($result['products'][0]['name'])->toBe('Business 1 Product');
});

test('get products tool includes product availability', function () {
    $business = createBusiness();
    $inStock = createProduct($business, ['name' => 'In Stock Product', 'stock' => 10]);
    $outOfStock = createProduct($business, ['name' => 'Out of Stock Product', 'stock' => 0]);

    $tool = new GetProductsTool($business);
    $result = json_decode($tool(''), true);

    // Find products by name to avoid order dependency
    $products = collect($result['products']);
    $inStockResult = $products->firstWhere('name', 'In Stock Product');
    $outOfStockResult = $products->firstWhere('name', 'Out of Stock Product');

    expect($inStockResult['available'])->toBeTrue()
        ->and($outOfStockResult['available'])->toBeFalse();
});

test('get products tool limits results to 50', function () {
    $business = createBusiness();

    // Create 60 products
    for ($i = 0; $i < 60; $i++) {
        createProduct($business);
    }

    $tool = new GetProductsTool($business);
    $result = json_decode($tool(''), true);

    expect($result['count'])->toBeLessThanOrEqual(50);
});
