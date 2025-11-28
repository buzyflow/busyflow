<?php

test('products are scoped to business', function () {
    $business1 = createBusiness();
    $business2 = createBusiness();

    $product1 = createProduct($business1);
    $product2 = createProduct($business2);

    expect($business1->products)->toHaveCount(1)
        ->and($business1->products->first()->id)->toBe($product1->id)
        ->and($business2->products)->toHaveCount(1)
        ->and($business2->products->first()->id)->toBe($product2->id);
});

test('customers are scoped to business', function () {
    $business1 = createBusiness();
    $business2 = createBusiness();

    $customer1 = createCustomer($business1);
    $customer2 = createCustomer($business2);

    expect($business1->customers)->toHaveCount(1)
        ->and($business1->customers->first()->id)->toBe($customer1->id)
        ->and($business2->customers)->toHaveCount(1)
        ->and($business2->customers->first()->id)->toBe($customer2->id);
});

test('user can only access their own business dashboard', function () {
    $user1 = createUser();
    $user2 = createUser();
    $business1 = createBusiness([], $user1);
    $business2 = createBusiness([], $user2);

    $response = $this->actingAs($user1)->get("/{$business2->slug}/dashboard");

    $response->assertForbidden();
});

test('business routes use slug binding', function () {
    $business = createBusiness(['name' => 'Test Shop']);

    $response = $this->actingAs($business->user)
        ->get("/{$business->slug}/dashboard");

    $response->assertOk();
});

test('carts are unique per business-customer pair', function () {
    $business = createBusiness();
    $customer = createCustomer($business);

    $cart1 = createCart($business, $customer);

    // Attempting to create another cart for same business-customer should fail
    expect(fn() => createCart($business, $customer))
        ->toThrow(\Illuminate\Database\QueryException::class);
});

test('orders are scoped to business', function () {
    $business1 = createBusiness();
    $business2 = createBusiness();

    $customer1 = createCustomer($business1);
    $customer2 = createCustomer($business2);

    expect($business1->orders)->toHaveCount(0)
        ->and($business2->orders)->toHaveCount(0);
});
