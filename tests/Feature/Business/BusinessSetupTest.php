<?php

test('authenticated user can access business setup page', function () {
    $user = createUser();

    $response = $this->actingAs($user)->get('/setup-business');

    $response->assertOk();
});

test('guest cannot access business setup page', function () {
    $response = $this->get('/setup-business');

    $response->assertRedirect('/login');
});

test('user can create business with valid data', function () {
    $user = createUser();

    $response = $this->actingAs($user)->post('/setup-business', [
        'name' => 'Test Shop',
        'phone' => '+1234567890',
        'industry' => 'Retail',
    ]);

    $response->assertRedirect();

    expect($user->businesses()->count())->toBe(1);
    $business = $user->businesses()->first();
    expect($business->name)->toBe('Test Shop')
        ->and($business->slug)->toBe('test-shop')
        ->and($business->bot)->not->toBeNull();
});

test('business setup creates bot automatically', function () {
    $user = createUser();

    $this->actingAs($user)->post('/setup-business', [
        'name' => 'Test Shop',
        'phone' => '+1234567890',
        'industry' => 'E-commerce',
    ]);

    $business = $user->businesses()->first();
    $bot = $business->bot;

    expect($bot)->not->toBeNull()
        ->and($bot->name)->toContain('Test Shop')
        ->and($bot->active)->toBeTrue();
});

test('business setup validates required fields', function () {
    $user = createUser();

    $response = $this->actingAs($user)->post('/setup-business', [
        'name' => '',
        'phone' => '',
        'industry' => '',
    ]);

    $response->assertSessionHasErrors(['name', 'phone', 'industry']);
});

test('business setup validates industry from allowed list', function () {
    $user = createUser();

    $response = $this->actingAs($user)->post('/setup-business', [
        'name' => 'Test Shop',
        'phone' => '+1234567890',
        'industry' => 'Invalid Industry',
    ]);

    $response->assertSessionHasErrors('industry');
});

test('business setup sets active business in session', function () {
    $user = createUser();

    $this->actingAs($user)->post('/setup-business', [
        'name' => 'Test Shop',
        'phone' => '+1234567890',
        'industry' => 'Retail',
    ]);

    $business = $user->businesses()->first();

    expect(session('active_business_id'))->toBe($business->id);
});
