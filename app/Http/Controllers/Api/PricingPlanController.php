<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PricingPlan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PricingPlanController extends Controller
{
    /**
     * Get all active pricing plans.
     */
    public function index(): JsonResponse
    {
        $pricingPlans = PricingPlan::active()
            ->ordered()
            ->get([
                'id',
                'name',
                'description',
                'price',
                'currency',
                'billing_period',
                'features',
                'is_featured',
                'max_products',
                'max_orders',
                'max_customers',
            ]);

        return response()->json([
            'success' => true,
            'data' => $pricingPlans,
        ]);
    }
}
