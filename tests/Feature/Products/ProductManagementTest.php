<?php

test('user can create product', function () {
    $business = createBusiness();

    $response = $this->actingAs($business->user)
        ->post("/{$business->slug}/products", [
            'name' => 'Test Product',
            'description' => 'Test Description',
            'price' => 99.99,
            'stock' => 10,
            'category' => 'Electronics',
        ]);

    $response->assertRedirect();

    expect($business->products()->count())->toBe(1);
    $product = $business->products()->first();
    expect($product->name)->toBe('Test Product')
        ->and($product->price)->toBe(99.99);
});

test('product name must be unique per business', function () {
    $business = createBusiness();
    createProduct($business, ['name' => 'Widget']);

    $response = $this->actingAs($business->user)
        ->post("/{$business->slug}/products", [
            'name' => 'Widget',
            'description' => 'Test',
            'price' => 10,
            'stock' => 5,
            'category' => 'Other',
        ]);

    $response->assertSessionHasErrors();
});

test('user can update product', function () {
    $business = createBusiness();
    $product = createProduct($business, ['name' => 'Old Name']);

    $response = $this->actingAs($business->user)
        ->put("/{$business->slug}/products/{$product->id}", [
            'name' => 'New Name',
            'description' => $product->description,
            'price' => $product->price,
            'stock' => $product->stock,
            'category' => $product->category,
        ]);

    $response->assertRedirect();
    expect($product->fresh()->name)->toBe('New Name');
});

test('user can delete product', function () {
    $business = createBusiness();
    $product = createProduct($business);

    $response = $this->actingAs($business->user)
        ->delete("/{$business->slug}/products/{$product->id}");

    $response->assertRedirect();
    expect($business->products()->count())->toBe(0);
});

test('user cannot access another business products', function () {
    $business1 = createBusiness();
    $business2 = createBusiness();
    $product = createProduct($business2);

    $response = $this->actingAs($business1->user)
        ->get("/{$business1->slug}/products/{$product->id}/edit");

    $response->assertForbidden();
});

test('guest cannot create product', function () {
    $business = createBusiness();

    $response = $this->post("/{$business->slug}/products", [
        'name' => 'Test Product',
        'price' => 10,
    ]);

    $response->assertRedirect('/login');
});
