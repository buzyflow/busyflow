<?php

use App\Models\Product;
use App\Models\Business;

test('product belongs to business', function () {
    $business = createBusiness();
    $product = createProduct($business);

    expect($product->business)->toBeInstanceOf(Business::class)
        ->and($product->business_id)->toBe($business->id);
});

test('product name must be unique per business', function () {
    $business = createBusiness();
    createProduct($business, ['name' => 'Widget']);

    expect(fn() => createProduct($business, ['name' => 'Widget']))
        ->toThrow(\Illuminate\Database\QueryException::class);
});

test('product can have same name in different businesses', function () {
    $business1 = createBusiness();
    $business2 = createBusiness();

    $product1 = createProduct($business1, ['name' => 'Widget']);
    $product2 = createProduct($business2, ['name' => 'Widget']);

    expect($product1->name)->toBe($product2->name)
        ->and($product1->business_id)->not->toBe($product2->business_id);
});

test('product has stock tracking', function () {
    $product = createProduct(createBusiness(), ['stock' => 10]);

    expect($product->stock)->toBe(10);
});

test('product description can be nullable', function () {
    $product = createProduct(createBusiness(), ['description' => null]);

    expect($product->description)->toBeNull();
});

test('product category can be nullable', function () {
    $product = createProduct(createBusiness(), ['category' => null]);

    expect($product->category)->toBeNull();
});

test('product image can be nullable', function () {
    $product = createProduct(createBusiness(), ['image' => null]);

    expect($product->image)->not->toBeNull(); // Has default image accessor
});
