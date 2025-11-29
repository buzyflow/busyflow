<?php

namespace App\Models\Traits;

use App\Models\Subscription;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasSubscriptions
{
    /**
     * Get all subscriptions for the user.
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    /**
     * Get the user's current active subscription.
     */
    public function subscription(): ?Subscription
    {
        return $this->subscriptions()
            ->where(function ($query) {
                $query->where('status', 'active')
                    ->orWhere('status', 'trial');
            })
            ->latest()
            ->first();
    }

    /**
     * Check if the user has an active subscription.
     */
    public function subscribed(): bool
    {
        $subscription = $this->subscription();
        return $subscription && $subscription->isValid();
    }

    /**
     * Check if the user is subscribed to a specific plan.
     */
    public function subscribedToPlan(int $planId): bool
    {
        $subscription = $this->subscription();
        return $subscription &&
            $subscription->plan_id === $planId &&
            $subscription->isValid();
    }

    /**
     * Check if the user is on trial.
     */
    public function onTrial(): bool
    {
        $subscription = $this->subscription();
        return $subscription && $subscription->onTrial();
    }

    /**
     * Check if the user is on grace period.
     */
    public function onGracePeriod(): bool
    {
        $subscription = $this->subscription();
        return $subscription && $subscription->onGracePeriod();
    }
}
