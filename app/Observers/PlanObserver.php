<?php

namespace App\Observers;

use App\Models\Plan;
use App\Services\PaystackService;
use Illuminate\Support\Facades\Log;

class PlanObserver
{
    public function __construct(protected PaystackService $paystackService) {}

    /**
     * Handle the Plan "creating" event.
     * Create plan in Paystack before saving to database.
     */
    public function creating(Plan $Plan): void
    {
        // Only create in Paystack if price > 0 (paid plans)
        if ($Plan->price > 0) {
            try {
                $paystackPlan = $this->paystackService->createPlan($Plan);
                $Plan->paystack_plan_code = $paystackPlan['plan_code'];

                Log::info('Paystack plan created', [
                    'plan_name' => $Plan->name,
                    'paystack_plan_code' => $Plan->paystack_plan_code,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to create plan in Paystack', [
                    'plan_name' => $Plan->name,
                    'error' => $e->getMessage(),
                ]);

                // Throw exception to prevent database save
                throw new \Exception('Failed to create plan in Paystack: ' . $e->getMessage());
            }
        }
    }

    /**
     * Handle the Plan "updating" event.
     * Update plan in Paystack before updating database.
     */
    public function updating(Plan $Plan): void
    {
        // Only update in Paystack if it has a plan code (paid plan)
        if ($Plan->paystack_plan_code) {
            try {
                $this->paystackService->updatePlan($Plan);

                Log::info('Paystack plan updated', [
                    'plan_id' => $Plan->id,
                    'plan_name' => $Plan->name,
                    'paystack_plan_code' => $Plan->paystack_plan_code,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to update plan in Paystack', [
                    'plan_id' => $Plan->id,
                    'plan_name' => $Plan->name,
                    'error' => $e->getMessage(),
                ]);

                // Throw exception to prevent database update
                throw new \Exception('Failed to update plan in Paystack: ' . $e->getMessage());
            }
        }
    }

    /**
     * Handle the Plan "deleting" event.
     * Delete plan from Paystack before deleting from database.
     */
    public function deleting(Plan $Plan): void
    {
        // Only attempt to delete from Paystack if it has a plan code
        if ($Plan->paystack_plan_code) {
            try {
                $this->paystackService->deletePlan($Plan->paystack_plan_code);

                Log::info('Paystack plan deletion logged', [
                    'plan_id' => $Plan->id,
                    'plan_name' => $Plan->name,
                    'paystack_plan_code' => $Plan->paystack_plan_code,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to delete plan from Paystack', [
                    'plan_id' => $Plan->id,
                    'plan_name' => $Plan->name,
                    'error' => $e->getMessage(),
                ]);

                // Don't throw exception for deletion - allow local deletion even if Paystack fails
                // since Paystack doesn't support plan deletion anyway
            }
        }
    }
}
