<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request, Business $business)
    {
        // Ensure the user owns the business
        if ($request->user()->id !== $business->user_id) {
            abort(403);
        }

        $orders = $business->orders()
            ->with(['customer', 'items'])
            ->latest()
            ->paginate(10)
            ->through(fn($order) => [
                'id' => $order->id,
                'customer' => $order->customer ? [
                    'id' => $order->customer->id,
                    'name' => $order->customer->name,
                    'email' => $order->customer->email,
                ] : null,
                'total' => $order->total,
                'status' => $order->status,
                'items_count' => $order->items->count(),
                'created_at' => $order->created_at->format('M d, Y H:i'),
                'created_at_human' => $order->created_at->diffForHumans(),
            ]);

        return Inertia::render('Orders/Index', [
            'business' => $business,
            'orders' => $orders,
        ]);
    }
}
