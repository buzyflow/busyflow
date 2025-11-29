<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Order;
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

    public function show(Request $request, Business $business, Order $order)
    {
        // Ensure the user owns the business
        if ($request->user()->id !== $business->user_id) {
            abort(403);
        }

        // Ensure the order belongs to the business
        if ($order->business_id !== $business->id) {
            abort(404);
        }

        $order->load(['customer', 'items.product']);

        return Inertia::render('Orders/Show', [
            'business' => $business,
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer' => $order->customer ? [
                    'id' => $order->customer->id,
                    'name' => $order->customer->name,
                    'email' => $order->customer->email,
                    'phone' => $order->customer->phone,
                ] : [
                    'name' => $order->customer_name,
                    'phone' => $order->customer_phone,
                ],
                'items' => $order->items->map(fn($item) => [
                    'id' => $item->id,
                    'product_name' => $item->product_name,
                    'product' => $item->product ? [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'image' => $item->product->image,
                    ] : null,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'total' => $item->total,
                ]),
                'delivery' => [
                    'address' => $order->delivery_address,
                    'city' => $order->delivery_city,
                    'state' => $order->delivery_state,
                    'notes' => $order->delivery_notes,
                ],
                'subtotal' => $order->subtotal,
                'discount' => $order->discount,
                'tax' => $order->tax,
                'delivery_fee' => $order->delivery_fee,
                'total' => $order->total,
                'currency' => $order->currency ?? 'NGN',
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'created_at' => $order->created_at->format('M d, Y H:i'),
                'created_at_human' => $order->created_at->diffForHumans(),
            ],
        ]);
    }

    public function updateStatus(Request $request, Business $business, Order $order)
    {
        // Ensure the user owns the business
        if ($request->user()->id !== $business->user_id) {
            abort(403);
        }

        // Ensure the order belongs to the business
        if ($order->business_id !== $business->id) {
            abort(404);
        }

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,processing,completed,cancelled'],
        ]);

        $order->update([
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with('success', 'Order status updated successfully.');
    }
}
