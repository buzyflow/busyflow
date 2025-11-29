<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Services\SubscriptionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function __construct(protected SubscriptionService $subscriptionService) {}

    /**
     * Show all pricing plans.
     */
    public function plans(Request $request)
    {
        $user = $request->user();
        $subscription = $user->subscription();
        $plans = Plan::orderBy('price')->get();

        return Inertia::render('Subscription/Plans', [
            'plans' => $plans->map(fn($plan) => [
                'id' => $plan->id,
                'name' => $plan->name,
                'description' => $plan->description,
                'price' => $plan->price,
                'currency' => $plan->currency,
                'billing_period' => $plan->billing_period->value,
                'features' => $plan->features,
                'is_featured' => $plan->is_featured,
            ]),
            'currentSubscription' => $subscription ? [
                'plan_id' => $subscription->plan_id,
                'status' => $subscription->status,
            ] : null,
        ]);
    }

    /**
     * Show the user's subscription.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $subscription = $user->subscription();

        return Inertia::render('Subscription/Index', [
            'subscription' => $subscription ? [
                'id' => $subscription->id,
                'plan' => $subscription->plan->only(['id', 'name', 'price', 'currency', 'billing_period']),
                'status' => $subscription->status,
                'trial_ends_at' => $subscription->trial_ends_at?->toDateTimeString(),
                'current_period_end' => $subscription->current_period_end?->toDateTimeString(),
                'cancelled_at' => $subscription->cancelled_at?->toDateTimeString(),
                'on_trial' => $subscription->onTrial(),
                'on_grace_period' => $subscription->onGracePeriod(),
            ] : null,
        ]);
    }

    /**
     * Initialize subscription payment.
     */
    public function create(Request $request, Plan $plan)
    {
        try {
            $result = $this->subscriptionService->subscribe($request->user(), $plan);

            // If result is a Subscription model, it means it was a free plan and is already active
            if ($result instanceof \App\Models\Subscription) {
                return redirect()->route('subscription.index')
                    ->with('success', 'You have successfully subscribed to the ' . $plan->name . ' plan.');
            }

            // Otherwise, it's a payment initialization array
            return Inertia::render('Subscription/Checkout', [
                'plan' => [
                    'id' => $plan->id,
                    'name' => $plan->name,
                    'price' => $plan->price,
                    'currency' => $plan->currency,
                    'billing_period' => $plan->billing_period->value,
                ],
                'authorization_url' => $result['authorization_url'],
                'access_code' => $result['access_code'],
                'reference' => $result['reference'],
                'paystack_public_key' => config('paystack.public_key'),
            ]);
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Handle Paystack callback.
     */
    public function callback(Request $request)
    {
        $reference = $request->query('reference');

        if (!$reference) {
            return redirect()->route('subscription.index')
                ->with('error', 'Invalid payment reference.');
        }

        try {
            $this->subscriptionService->verifyAndActivate($reference);

            return redirect()->route('subscription.index')
                ->with('success', 'Subscription activated successfully!');
        } catch (\Exception $e) {
            return redirect()->route('subscription.index')
                ->with('error', 'Failed to verify payment: ' . $e->getMessage());
        }
    }

    /**
     * Cancel the user's subscription.
     */
    public function cancel(Request $request)
    {
        try {
            $this->subscriptionService->cancel($request->user());

            return redirect()->back()
                ->with('success', 'Subscription cancelled successfully. You can continue using the service until the end of your billing period.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to cancel subscription: ' . $e->getMessage());
        }
    }

    /**
     * Resume a cancelled subscription.
     */
    public function resume(Request $request)
    {
        try {
            $this->subscriptionService->resume($request->user());

            return redirect()->back()
                ->with('success', 'Subscription resumed successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to resume subscription: ' . $e->getMessage());
        }
    }
}
