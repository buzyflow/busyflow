<?php

use App\Models\Business;
use App\Models\Customer;
use App\Models\Product;
use App\Prism\Tools\AddToCartTool;

test('add to cart tool creates cart if not exists', function () {
    $business = createBusiness();
    $customer = createCustomer($business);
    $product = createProduct($business);

    $tool = new AddToCartTool($business, $customer);
    $result = json_decode($tool($product->id, 2), true);

    expect($result)->toHaveKey('status')
        ->and($result['status'])->toBe('success')
        ->and($customer->carts()->count())->toBe(1);
});

test('add to cart tool adds product to existing cart', function () {
    $business = createBusiness();
    $customer = createCustomer($business);
    $cart = createCart($business, $customer);
    $product = createProduct($business);

    $tool = new AddToCartTool($business, $customer);
    $result = json_decode($tool($product->id, 3), true);

    expect($result['status'])->toBe('success')
        ->and($cart->fresh()->items()->count())->toBe(1)
        ->and($cart->fresh()->items()->first()->quantity)->toBe(3);
});

test('add to cart tool updates quantity if product already in cart', function () {
    $business = createBusiness();
    $customer = createCustomer($business);
    $cart = createCart($business, $customer);
    $product = createProduct($business);

    addProductToCart($cart, $product, 2);

    $tool = new AddToCartTool($business, $customer);
    $result = json_decode($tool($product->id, 3), true);

    expect($result['status'])->toBe('success')
        ->and($cart->fresh()->items()->first()->quantity)->toBe(5);
});

test('add to cart tool validates product belongs to business', function () {
    $business1 = createBusiness();
    $business2 = createBusiness();
    $customer = createCustomer($business1);
    $product = createProduct($business2);

    $tool = new AddToCartTool($business1, $customer);
    $result = json_decode($tool($product->id, 1), true);

    expect($result['status'])->toBe('error')
        ->and($result)->toHaveKey('message');
});
