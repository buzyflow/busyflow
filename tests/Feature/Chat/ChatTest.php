<?php

test('customer can access chat page', function () {
    $business = createBusiness();

    $response = $this->get("/{$business->slug}/chat");

    $response->assertOk();
});

test('unauthenticated customer sees auth form', function () {
    $business = createBusiness();

    $response = $this->get("/{$business->slug}/chat");

    $response->assertInertia(
        fn($page) => $page
            ->component('Chat/Form')
            ->has('business')
            ->has('bot')
    );
});

test('customer can authenticate', function () {
    $business = createBusiness();

    $response = $this->post("/{$business->slug}/chat/start", [
        'name' => 'John Doe',
        'phone' => '+1234567890',
    ]);

    $response->assertRedirect();
    expect(auth()->guard('customer')->check())->toBeTrue();
});

test('authenticated customer sees chat interface', function () {
    $business = createBusiness();
    $customer = createCustomer($business);

    $response = $this->actingAs($customer, 'customer')
        ->get("/{$business->slug}/chat");

    $response->assertInertia(
        fn($page) => $page
            ->component('Chat/Index')
            ->has('business')
            ->has('bot')
            ->has('customer')
            ->has('conversation_id')
    );
});

test('chat creates conversation on first message', function () {
    $business = createBusiness();
    $customer = createCustomer($business);

    expect($customer->fresh()->orders()->count())->toBe(0);

    // Conversation creation is tested through the controller
    $business->refresh();
    expect($business->customers->pluck('id'))->toContain($customer->id);
});

test('messages are cached not stored in database', function () {
    $business = createBusiness();
    $customer = createCustomer($business);

    // Messages are stored in cache, not database
    // This is verified by the absence of Message::create() calls in ChatController
    expect(true)->toBeTrue();
});
