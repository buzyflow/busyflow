<?php

use App\Enums\BotTone;
use App\Models\Bot;
use App\Models\Business;

test('bot belongs to business', function () {
    $business = createBusiness();
    $bot = $business->bot;

    expect($bot->business)->toBeInstanceOf(Business::class)
        ->and($bot->business_id)->toBe($business->id);
});

test('bot tone is cast to enum', function () {
    $bot = Bot::factory()->create(['tone' => BotTone::FRIENDLY]);

    expect($bot->tone)->toBeInstanceOf(BotTone::class);
    expect($bot->tone)->toBe(BotTone::FRIENDLY);
});

test('bot persona is cast to array when json', function () {
    $persona = ['role' => 'assistant', 'instructions' => 'Be helpful'];
    $bot = Bot::factory()->create(['persona' => json_encode($persona)]);

    expect($bot->persona)->toBeString();
});

test('bot can be active or inactive', function () {
    $activeBot = Bot::factory()->create(['active' => true]);
    $inactiveBot = Bot::factory()->create(['active' => false]);

    expect($activeBot->active)->toBeTrue()
        ->and($inactiveBot->active)->toBeFalse();
});

test('bot has required fields', function () {
    $bot = Bot::factory()->create();

    expect($bot->name)->not->toBeNull()
        ->and($bot->business_id)->not->toBeNull();
});
