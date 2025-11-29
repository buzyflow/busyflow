<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();
        $businessId = session('active_business_id') ?? $user->businesses()->first()?->id;

        if (!$businessId) {
            return redirect('/setup-business');
        }

        $business = Business::with('bot')->findOrFail($businessId);

        // Calculate analytics
        $analytics = [
            'total_customers' => $business->customers()->count(),
            'total_orders' => $business->orders()->count(),
            'total_products' => $business->products()->count(),
            'total_revenue' => $business->orders()->sum('total'),
            'new_orders_today' => $business->orders()
                ->whereDate('created_at', today())
                ->count(),
            'new_customers_this_week' => $business->customers()
                ->where('created_at', '>=', now()->subWeek())
                ->count(),
        ];

        // Get recent orders
        $recentOrders = $business->orders()
            ->with('customer')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($order) => [
                'id' => $order->id,
                'customer_name' => $order->customer->name ?? 'Guest',
                'total' => $order->total,
                'status' => $order->status,
                'created_at' => $order->created_at->diffForHumans(),
            ]);

        return Inertia::render('Dashboard', [
            'business' => [
                'id' => $business->id,
                'name' => $business->name,
                'slug' => $business->slug,
                'phone' => $business->phone,
                'industry' => $business->industry,
                'currency' => $business->currency,
            ],
            'bot' => $business->bot ? [
                'name' => $business->bot->name,
                'description' => $business->bot->description,
                'avatar' => $business->bot->avatar,
                'persona' => $business->bot->persona,
                'tone' => $business->bot->tone,
                'active' => $business->bot->active,
                'url' => url("/{$business->slug}/bot"),
            ] : null,
            'analytics' => $analytics,
            'recentOrders' => $recentOrders,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }
}
