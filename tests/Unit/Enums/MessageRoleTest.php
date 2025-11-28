<?php

use App\Enums\MessageRole;

test('message role enum has all expected cases', function () {
    $cases = MessageRole::cases();

    expect($cases)->toHaveCount(3)
        ->and(array_map(fn($case) => $case->value, $cases))
        ->toEqual(['user', 'assistant', 'system']);
});

test('message role enum can be instantiated from string', function () {
    $role = MessageRole::from('user');

    expect($role)->toBeInstanceOf(MessageRole::class);
    expect($role)->toBe(MessageRole::USER);
    expect($role->value)->toBe('user');
});

test('message role enum throws exception for invalid value', function () {
    MessageRole::from('invalid');
})->throws(ValueError::class);
