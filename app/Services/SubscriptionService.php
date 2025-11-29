<?php

namespace App\Services;

use App\Models\Plan;
use App\Models\Subscription;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SubscriptionService
{
    public function __construct(protected PaystackService $paystackService) {}

    /**
     * Subscribe a user to a pricing plan.
     * Returns an array with payment initialization data for paid plans,
     * or the created Subscription model for free plans.
     *
     * @param User $user
     * @param Plan $plan
     * @return array|Subscription
     * @throws Exception
     */
    public function subscribe(User $user, Plan $plan): array|Subscription
    {
        if ($user->subscribed()) {
            throw new Exception('User already has an active subscription.');
        }

        // Handle Free Plan
        if ($plan->price <= 0) {
            return $this->createFreeSubscription($user, $plan);
        }

        // Handle Paid Plan
        return $this->paystackService->initializeTransaction($user, $plan);
    }

    /**
     * Create a local subscription for a free plan.
     *
     * @param User $user
     * @param Plan $plan
     * @return Subscription
     * @throws Exception
     */
    protected function createFreeSubscription(User $user, Plan $plan): Subscription
    {
        try {
            return DB::transaction(function () use ($user, $plan) {
                return $this->paystackService->createSubscription($user, $plan, [
                    'subscription' => ['subscription_code' => null],
                    'customer' => ['customer_code' => null, 'email' => $user->email],
                ]);
            });
        } catch (Exception $e) {
            Log::error('Failed to create free subscription', [
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'error' => $e->getMessage(),
            ]);
            throw new Exception('Failed to create free subscription: ' . $e->getMessage());
        }
    }

    /**
     * Verify a Paystack transaction and activate the subscription.
     *
     * @param string $reference
     * @return Subscription
     * @throws Exception
     */
    public function verifyAndActivate(string $reference): Subscription
    {
        $transaction = $this->paystackService->verifyTransaction($reference);

        if (($transaction['status'] ?? '') !== 'success') {
            throw new Exception('Payment was not successful.');
        }

        $planId = $transaction['metadata']['plan_id'] ?? null;
        $userId = $transaction['metadata']['user_id'] ?? null;

        if (!$planId || !$userId) {
            throw new Exception('Invalid transaction metadata.');
        }

        $plan = Plan::findOrFail($planId);
        $user = User::findOrFail($userId);

        return $this->paystackService->createSubscription($user, $plan, $transaction);
    }

    /**
     * Cancel a user's subscription.
     *
     * @param User $user
     * @return void
     * @throws Exception
     */
    public function cancel(User $user): void
    {
        $subscription = $user->subscription();

        if (!$subscription) {
            throw new Exception('No active subscription found.');
        }

        // Cancel on Paystack if it's a paid subscription
        if ($subscription->paystack_subscription_code && $subscription->paystack_email_token) {
            $this->paystackService->cancelSubscription(
                $subscription->paystack_subscription_code,
                $subscription->paystack_email_token
            );
        }

        // Cancel locally
        $subscription->cancel();
    }

    /**
     * Resume a cancelled subscription.
     *
     * @param User $user
     * @return void
     * @throws Exception
     */
    public function resume(User $user): void
    {
        $subscription = $user->subscription();

        if (!$subscription || !$subscription->onGracePeriod()) {
            throw new Exception('Subscription cannot be resumed.');
        }

        // Note: Paystack API might not support "resuming" a cancelled subscription directly
        // in the same way Stripe does. Usually, you'd need to create a new one.
        // However, for local logic, we can just un-cancel it if it's within the grace period
        // and we assume the Paystack subscription wasn't fully disabled yet or we handle re-enablement.
        // Given the previous implementation just called $subscription->resume(), we'll stick to that
        // but strictly speaking, re-enabling on Paystack might be needed if we disabled it there.
        // For now, we follow the existing pattern which assumes local resumption is enough
        // or that the user will just ride out the grace period and then re-subscribe.
        // BUT, if we called `disable` on Paystack, we can't just "resume" it there easily.
        // The previous controller code did:
        // $this->paystackService->cancelSubscription(...) then $subscription->cancel();
        // So resuming locally might be tricky if Paystack considers it cancelled.
        // For this refactor, I will keep the local resume logic as requested, but add a comment.

        $subscription->resume();
    }
}
