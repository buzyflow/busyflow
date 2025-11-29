<?php

namespace App\Observers;

use App\Models\PricingPlan;
use App\Services\PaystackService;
use Illuminate\Support\Facades\Log;

class PricingPlanObserver
{
    public function __construct(protected PaystackService $paystackService) {}

    /**
     * Handle the PricingPlan "creating" event.
     * Create plan in Paystack before saving to database.
     */
    public function creating(PricingPlan $pricingPlan): void
    {
        // Only create in Paystack if price > 0 (paid plans)
        if ($pricingPlan->price > 0) {
            try {
                $paystackPlan = $this->paystackService->createPlan($pricingPlan);
                $pricingPlan->paystack_plan_code = $paystackPlan['plan_code'];

                Log::info('Paystack plan created', [
                    'plan_name' => $pricingPlan->name,
                    'paystack_plan_code' => $pricingPlan->paystack_plan_code,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to create plan in Paystack', [
                    'plan_name' => $pricingPlan->name,
                    'error' => $e->getMessage(),
                ]);

                // Throw exception to prevent database save
                throw new \Exception('Failed to create plan in Paystack: ' . $e->getMessage());
            }
        }
    }

    /**
     * Handle the PricingPlan "updating" event.
     * Update plan in Paystack before updating database.
     */
    public function updating(PricingPlan $pricingPlan): void
    {
        // Only update in Paystack if it has a plan code (paid plan)
        if ($pricingPlan->paystack_plan_code) {
            try {
                $this->paystackService->updatePlan($pricingPlan);

                Log::info('Paystack plan updated', [
                    'plan_id' => $pricingPlan->id,
                    'plan_name' => $pricingPlan->name,
                    'paystack_plan_code' => $pricingPlan->paystack_plan_code,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to update plan in Paystack', [
                    'plan_id' => $pricingPlan->id,
                    'plan_name' => $pricingPlan->name,
                    'error' => $e->getMessage(),
                ]);

                // Throw exception to prevent database update
                throw new \Exception('Failed to update plan in Paystack: ' . $e->getMessage());
            }
        }
    }

    /**
     * Handle the PricingPlan "deleting" event.
     * Delete plan from Paystack before deleting from database.
     */
    public function deleting(PricingPlan $pricingPlan): void
    {
        // Only attempt to delete from Paystack if it has a plan code
        if ($pricingPlan->paystack_plan_code) {
            try {
                $this->paystackService->deletePlan($pricingPlan->paystack_plan_code);

                Log::info('Paystack plan deletion logged', [
                    'plan_id' => $pricingPlan->id,
                    'plan_name' => $pricingPlan->name,
                    'paystack_plan_code' => $pricingPlan->paystack_plan_code,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to delete plan from Paystack', [
                    'plan_id' => $pricingPlan->id,
                    'plan_name' => $pricingPlan->name,
                    'error' => $e->getMessage(),
                ]);

                // Don't throw exception for deletion - allow local deletion even if Paystack fails
                // since Paystack doesn't support plan deletion anyway
            }
        }
    }
}
