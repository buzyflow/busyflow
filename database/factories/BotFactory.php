<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bot>
 */
class BotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'business_id' => \App\Models\Business::factory(),
            'name' => fake()->company() . ' Assistant',
            'description' => fake()->sentence(),
            'avatar' => fake()->imageUrl(),
            'persona' => json_encode([
                'role' => 'assistant',
                'instructions' => fake()->sentence(),
            ]),
            'tone' => \App\Enums\BotTone::FRIENDLY,
            'active' => true,
        ];
    }
}
