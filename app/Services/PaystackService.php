<?php

namespace App\Services;

use App\Models\PricingPlan;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaystackService
{
    protected string $secretKey;
    protected string $publicKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->secretKey = config('paystack.secret_key');
        $this->publicKey = config('paystack.public_key');
        $this->baseUrl = config('paystack.payment_url');
    }

    /**
     * Create a plan on Paystack.
     */
    public function createPlan(PricingPlan $pricingPlan): array
    {
        $response = Http::withToken($this->secretKey)
            ->post("{$this->baseUrl}/plan", [
                'name' => $pricingPlan->name,
                'amount' => $pricingPlan->price * 100, // Convert to kobo
                'interval' => $pricingPlan->billing_period->value,
                'currency' => $pricingPlan->currency,
                'description' => $pricingPlan->description,
            ]);

        if (!$response->successful()) {
            Log::error('Paystack plan creation failed', [
                'plan_id' => $pricingPlan->id,
                'response' => $response->json(),
            ]);
            throw new \Exception('Failed to create plan on Paystack: ' . $response->json('message'));
        }

        return $response->json('data');
    }

    /**
     * Update a plan on Paystack.
     */
    public function updatePlan(PricingPlan $pricingPlan): array
    {
        if (!$pricingPlan->paystack_plan_code) {
            throw new \Exception('Cannot update plan: Paystack plan code not found');
        }

        $response = Http::withToken($this->secretKey)
            ->put("{$this->baseUrl}/plan/{$pricingPlan->paystack_plan_code}", [
                'name' => $pricingPlan->name,
                'amount' => $pricingPlan->price * 100, // Convert to kobo
                'interval' => $pricingPlan->billing_period->value,
                'currency' => $pricingPlan->currency,
                'description' => $pricingPlan->description,
            ]);

        if (!$response->successful()) {
            Log::error('Paystack plan update failed', [
                'plan_id' => $pricingPlan->id,
                'paystack_plan_code' => $pricingPlan->paystack_plan_code,
                'response' => $response->json(),
            ]);
            throw new \Exception('Failed to update plan on Paystack: ' . $response->json('message'));
        }

        return $response->json('data');
    }

    /**
     * Delete a plan on Paystack.
     */
    public function deletePlan(string $paystackPlanCode): bool
    {
        // Note: Paystack doesn't support deleting plans via API
        // We'll just log this and return true to allow local deletion
        Log::info('Plan deletion requested', [
            'paystack_plan_code' => $paystackPlanCode,
            'note' => 'Paystack does not support plan deletion via API. Plan remains in Paystack but is removed locally.',
        ]);

        return true;
    }

    /**
     * Initialize a transaction for subscription.
     */
    public function initializeTransaction(User $user, PricingPlan $plan, ?string $callbackUrl = null): array
    {
        // Create plan in Paystack if it doesn't exist
        if (!$plan->paystack_plan_code) {
            $paystackPlan = $this->createPlan($plan);
            $plan->update(['paystack_plan_code' => $paystackPlan['plan_code']]);
        }

        $response = Http::withToken($this->secretKey)
            ->post("{$this->baseUrl}/transaction/initialize", [
                'email' => $user->email,
                'amount' => $plan->price * 100, // Convert to kobo
                'currency' => $plan->currency,
                'plan' => $plan->paystack_plan_code,
                'callback_url' => $callbackUrl ?? route('subscription.callback'),
                'metadata' => [
                    'user_id' => $user->id,
                    'pricing_plan_id' => $plan->id,
                    'custom_fields' => [
                        [
                            'display_name' => 'User Name',
                            'variable_name' => 'user_name',
                            'value' => $user->name,
                        ],
                    ],
                ],
            ]);

        if (!$response->successful()) {
            Log::error('Paystack transaction initialization failed', [
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'response' => $response->json(),
            ]);
            throw new \Exception('Failed to initialize transaction: ' . $response->json('message'));
        }

        return $response->json('data');
    }

    /**
     * Verify a transaction.
     */
    public function verifyTransaction(string $reference): array
    {
        $response = Http::withToken($this->secretKey)
            ->get("{$this->baseUrl}/transaction/verify/{$reference}");

        if (!$response->successful()) {
            Log::error('Paystack transaction verification failed', [
                'reference' => $reference,
                'response' => $response->json(),
            ]);
            throw new \Exception('Failed to verify transaction: ' . $response->json('message'));
        }

        return $response->json('data');
    }

    /**
     * Create a subscription after successful payment.
     */
    public function createSubscription(User $user, PricingPlan $plan, array $transactionData): Subscription
    {
        $subscription = Subscription::create([
            'user_id' => $user->id,
            'pricing_plan_id' => $plan->id,
            'paystack_subscription_code' => $transactionData['subscription']['subscription_code'] ?? null,
            'paystack_customer_code' => $transactionData['customer']['customer_code'] ?? null,
            'paystack_email_token' => $transactionData['customer']['email'] ?? null,
            'status' => 'active',
            'current_period_start' => now(),
            'current_period_end' => $this->calculatePeriodEnd($plan->billing_period->value),
        ]);

        Log::info('Subscription created', [
            'subscription_id' => $subscription->id,
            'user_id' => $user->id,
            'plan_id' => $plan->id,
        ]);

        return $subscription;
    }

    /**
     * Cancel a subscription on Paystack.
     */
    public function cancelSubscription(string $subscriptionCode, string $emailToken): array
    {
        $response = Http::withToken($this->secretKey)
            ->post("{$this->baseUrl}/subscription/disable", [
                'code' => $subscriptionCode,
                'token' => $emailToken,
            ]);

        if (!$response->successful()) {
            Log::error('Paystack subscription cancellation failed', [
                'subscription_code' => $subscriptionCode,
                'response' => $response->json(),
            ]);
            throw new \Exception('Failed to cancel subscription: ' . $response->json('message'));
        }

        return $response->json('data');
    }

    /**
     * Get subscription details from Paystack.
     */
    public function getSubscription(string $subscriptionCode): array
    {
        $response = Http::withToken($this->secretKey)
            ->get("{$this->baseUrl}/subscription/{$subscriptionCode}");

        if (!$response->successful()) {
            Log::error('Paystack get subscription failed', [
                'subscription_code' => $subscriptionCode,
                'response' => $response->json(),
            ]);
            throw new \Exception('Failed to get subscription: ' . $response->json('message'));
        }

        return $response->json('data');
    }

    /**
     * Handle Paystack webhook events.
     */
    public function handleWebhook(array $payload): void
    {
        $event = $payload['event'] ?? null;

        Log::info('Paystack webhook received', ['event' => $event]);

        match ($event) {
            'subscription.create' => $this->handleSubscriptionCreate($payload['data']),
            'subscription.disable' => $this->handleSubscriptionDisable($payload['data']),
            'invoice.payment_failed' => $this->handleInvoicePaymentFailed($payload['data']),
            'charge.success' => $this->handleChargeSuccess($payload['data']),
            default => Log::info('Unhandled webhook event', ['event' => $event]),
        };
    }

    /**
     * Handle subscription.create webhook.
     */
    protected function handleSubscriptionCreate(array $data): void
    {
        // Subscription is already created in createSubscription method
        Log::info('Subscription create webhook', ['data' => $data]);
    }

    /**
     * Handle subscription.disable webhook.
     */
    protected function handleSubscriptionDisable(array $data): void
    {
        $subscriptionCode = $data['subscription_code'] ?? null;

        if ($subscriptionCode) {
            $subscription = Subscription::where('paystack_subscription_code', $subscriptionCode)->first();

            if ($subscription) {
                $subscription->cancel();
                Log::info('Subscription disabled via webhook', ['subscription_id' => $subscription->id]);
            }
        }
    }

    /**
     * Handle invoice.payment_failed webhook.
     */
    protected function handleInvoicePaymentFailed(array $data): void
    {
        $subscriptionCode = $data['subscription']['subscription_code'] ?? null;

        if ($subscriptionCode) {
            $subscription = Subscription::where('paystack_subscription_code', $subscriptionCode)->first();

            if ($subscription) {
                Log::warning('Payment failed for subscription', [
                    'subscription_id' => $subscription->id,
                    'user_id' => $subscription->user_id,
                ]);
                // You might want to notify the user or take other actions
            }
        }
    }

    /**
     * Handle charge.success webhook.
     */
    protected function handleChargeSuccess(array $data): void
    {
        $subscriptionCode = $data['subscription']['subscription_code'] ?? null;

        if ($subscriptionCode) {
            $subscription = Subscription::where('paystack_subscription_code', $subscriptionCode)->first();

            if ($subscription) {
                // Update subscription period
                $subscription->update([
                    'current_period_start' => now(),
                    'current_period_end' => $this->calculatePeriodEnd($subscription->pricingPlan->billing_period->value),
                ]);

                Log::info('Subscription renewed via webhook', ['subscription_id' => $subscription->id]);
            }
        }
    }

    /**
     * Calculate the end of the billing period.
     */
    protected function calculatePeriodEnd(string $billingPeriod): \Carbon\Carbon
    {
        return match ($billingPeriod) {
            'monthly' => now()->addMonth(),
            'quarterly' => now()->addMonths(3),
            'annually', 'yearly' => now()->addYear(),
            default => now()->addMonth(),
        };
    }
}
