<?php

use App\Enums\BillingPeriod;

test('billing period enum has all expected cases', function () {
    $cases = BillingPeriod::cases();

    expect($cases)->toHaveCount(2)
        ->and(array_map(fn($case) => $case->value, $cases))
        ->toEqual(['monthly', 'yearly']);
});

test('billing period enum can be instantiated from string', function () {
    $period = BillingPeriod::from('monthly');

    expect($period)->toBeInstanceOf(BillingPeriod::class);
    expect($period)->toBe(BillingPeriod::MONTHLY);
    expect($period->value)->toBe('monthly');
});

test('billing period enum throws exception for invalid value', function () {
    BillingPeriod::from('invalid');
})->throws(ValueError::class);
