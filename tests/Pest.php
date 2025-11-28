<?php

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test functions is always bound to a specific PHPUnit test
| case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
| need to change it using the "pest()" function to bind a different classes or traits.
|
*/

pest()->extend(Tests\TestCase::class)
    ->use(Illuminate\Foundation\Testing\RefreshDatabase::class)
    ->in('Feature');

pest()->extend(Tests\TestCase::class)
    ->use(Illuminate\Foundation\Testing\RefreshDatabase::class)
    ->in('Unit');

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| When you're writing tests, you often need to check that values meet certain conditions. The
| "expect()" function gives you access to a set of "expectations" methods that you can use
| to assert different things. Of course, you may extend the Expectation API at any time.
|
*/

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

expect()->extend('toBeEnum', function (string $enumClass) {
    $this->toBeInstanceOf($enumClass);

    return $this;
});

expect()->extend('toHaveSlug', function () {
    return $this->not->toBeNull()
        ->and($this->value)->toMatch('/^[a-z0-9]+(?:-[a-z0-9]+)*$/');
});

/*
|--------------------------------------------------------------------------
| Helper Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may have some testing code specific to your
| project that you don't want to repeat in every file. Here you can also expose helpers as
| global functions to help you to reduce the number of lines of code in your test files.
|
*/

function createUser(array $attributes = []): \App\Models\User
{
    return \App\Models\User::factory()->create($attributes);
}

function createBusiness(array $attributes = [], ?\App\Models\User $user = null): \App\Models\Business
{
    return \App\Models\Business::factory()
        ->for($user ?? createUser())
        ->has(\App\Models\Bot::factory())
        ->create($attributes);
}

function createProduct(\App\Models\Business $business, array $attributes = []): \App\Models\Product
{
    return \App\Models\Product::factory()
        ->for($business)
        ->create($attributes);
}

function createCustomer(\App\Models\Business $business, array $attributes = []): \App\Models\Customer
{
    return \App\Models\Customer::factory()
        ->for($business)
        ->create($attributes);
}

function actingAsCustomer(\App\Models\Customer $customer): \Illuminate\Testing\TestResponse
{
    return test()->actingAs($customer, 'customer');
}

function createCart(\App\Models\Business $business, \App\Models\Customer $customer): \App\Models\Cart
{
    return \App\Models\Cart::factory()
        ->for($business)
        ->for($customer)
        ->create();
}

function addProductToCart(\App\Models\Cart $cart, \App\Models\Product $product, int $quantity = 1): \App\Models\CartItem
{
    return \App\Models\CartItem::factory()
        ->for($cart)
        ->for($product)
        ->create([
            'quantity' => $quantity,
            'price' => $product->price,
            'currency' => $product->currency,
        ]);
}
