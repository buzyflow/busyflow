<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessSetupController extends Controller
{
    public function create()
    {
        return Inertia::render('Business/Setup');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'industry' => 'required|string|max:100',
        ]);

        $business = Business::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'phone' => $request->phone,
            'industry' => $request->industry,
            'currency' => 'NGN',
        ]);

        // Create bot for the business with default configuration
        $business->bot()->create([
            'name' => $request->name . ' Assistant',
            'description' => "AI assistant for {$request->name}, helping customers browse products and place orders.",
            'avatar' => 'https://avatar.iran.liara.run/public/boy?username=' . urlencode($request->name),
            'persona' => "You are a helpful AI assistant for {$request->name}, a business in the {$request->industry} industry. You are friendly, professional, and always ready to help customers.",
            'tone' => 'warm and professional',
            'active' => true,
        ]);

        // Store the active business ID in session
        session(['active_business_id' => $business->id]);

        return redirect('/dashboard');
    }
}
