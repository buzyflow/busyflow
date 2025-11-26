<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('customer')->latest()->get();

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'customer_name' => 'required|string',
            'customer_phone' => 'required|string',
            'items' => 'required|array',
            'total' => 'required|numeric|min:0',
            'order_timestamp' => 'required|integer',
        ]);

        $order = $request->user()->orders()->create($validated);

        return response()->json($order, 201);
    }

    public function update(Request $request, Order $order)
    {
        if ($order->vendor_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|string|in:PENDING,CONFIRMED,SHIPPED,COMPLETE',
        ]);

        $order->update($validated);

        return response()->json($order);
    }
}
