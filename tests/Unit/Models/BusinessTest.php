<?php

use App\Models\Business;
use App\Models\Bot;
use App\Models\Product;
use App\Models\Customer;

test('business auto-generates slug from name', function () {
    $business = Business::factory()->create(['name' => 'Test Shop']);

    expect($business->slug)->toHaveSlug()
        ->and($business->slug)->toBe('test-shop');
});

test('business has one bot', function () {
    $business = createBusiness();

    expect($business->bot)->toBeInstanceOf(Bot::class)
        ->and($business->bot->business_id)->toBe($business->id);
});

test('business has many products', function () {
    $business = createBusiness();
    createProduct($business);
    createProduct($business);

    expect($business->products)->toHaveCount(2)
        ->each->toBeInstanceOf(Product::class);
});

test('business has many customers', function () {
    $business = createBusiness();
    createCustomer($business);
    createCustomer($business);

    expect($business->customers)->toHaveCount(2)
        ->each->toBeInstanceOf(Customer::class);
});

test('business belongs to user', function () {
    $business = createBusiness();

    expect($business->user)->not->toBeNull()
        ->and($business->user_id)->toBe($business->user->id);
});

test('business details are cast to array', function () {
    $details = ['key' => 'value'];
    $business = Business::factory()->create(['business_details' => $details]);

    expect($business->business_details)->toBeArray()
        ->and($business->business_details)->toBe($details);
});
