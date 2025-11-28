<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Business>
 */
class BusinessFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'name' => fake()->company(),
            'phone' => fake()->phoneNumber(),
            'industry' => fake()->randomElement(['Retail', 'E-commerce', 'Food & Beverage', 'Other']),
            'currency' => 'NGN',
            'business_details' => null,
        ];
    }
}
