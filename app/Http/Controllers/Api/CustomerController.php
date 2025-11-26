<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $customers = $request->user()->customers()->latest('last_active')->get();

        return response()->json($customers);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'phone' => 'required|string',
            'name' => 'required|string',
        ]);

        $customer = $request->user()->customers()->updateOrCreate(
            ['phone' => $validated['phone']],
            [
                'name' => $validated['name'],
                'last_active' => now(),
            ]
        );

        return response()->json($customer, 201);
    }

    public function byPhone(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'vendor_id' => 'required|string',
        ]);

        $customer = Customer::where('vendor_id', $request->vendor_id)
            ->where('phone', $request->phone)
            ->first();

        if (! $customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        return response()->json($customer);
    }
}
