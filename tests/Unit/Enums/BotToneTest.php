<?php

use App\Enums\BotTone;

test('bot tone enum has all expected cases', function () {
    $cases = BotTone::cases();

    expect($cases)->toHaveCount(4)
        ->and(array_map(fn($case) => $case->value, $cases))
        ->toEqual(['friendly', 'formal', 'casual', 'humorous']);
});

test('bot tone enum can be instantiated from string', function () {
    $tone = BotTone::from('friendly');

    expect($tone)->toBeInstanceOf(BotTone::class);
    expect($tone)->toBe(BotTone::FRIENDLY);
    expect($tone->value)->toBe('friendly');
});

test('bot tone enum throws exception for invalid value', function () {
    BotTone::from('invalid');
})->throws(ValueError::class);

test('bot tone enum values are unique', function () {
    $values = array_map(fn($case) => $case->value, BotTone::cases());

    expect($values)->toBe(array_unique($values));
});
