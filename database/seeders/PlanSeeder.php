<?php

namespace Database\Seeders;

use App\Enums\BillingPeriod;
use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Starter',
                'description' => 'Perfect for small businesses just getting started.',
                'price' => 0,
                'currency' => 'NGN',
                'billing_period' => BillingPeriod::MONTHLY,
                'paystack_plan_code' => null, // Free plan
                'features' => [
                    'Up to 50 products',
                    'Basic analytics',
                    'Standard support',
                    '1 team member',
                ],
                'is_active' => true,
                'is_featured' => false,
                'max_products' => 50,
                'max_orders' => 100,
                'max_customers' => 100,
                'sort_order' => 1,
            ],
            [
                'name' => 'Professional',
                'description' => 'Ideal for growing businesses with more demands.',
                'price' => 5000,
                'currency' => 'NGN',
                'billing_period' => BillingPeriod::MONTHLY,
                'features' => [
                    'Unlimited products',
                    'Advanced analytics',
                    'Priority support',
                    '5 team members',
                    'Custom domain',
                ],
                'is_active' => true,
                'is_featured' => true,
                'max_products' => null, // Unlimited
                'max_orders' => 1000,
                'max_customers' => 1000,
                'sort_order' => 2,
            ],
            [
                'name' => 'Enterprise',
                'description' => 'For large scale businesses needing maximum power.',
                'price' => 15000,
                'currency' => 'NGN',
                'billing_period' => BillingPeriod::MONTHLY,
                'features' => [
                    'Everything in Professional',
                    'Dedicated account manager',
                    '24/7 Phone support',
                    'Unlimited team members',
                    'API Access',
                    'White labeling',
                ],
                'is_active' => true,
                'is_featured' => false,
                'max_products' => null,
                'max_orders' => null,
                'max_customers' => null,
                'sort_order' => 3,
            ],
        ];

        foreach ($plans as $plan) {
            Plan::updateOrCreate(
                ['name' => $plan['name']],
                $plan
            );
        }
    }
}
