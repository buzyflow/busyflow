<?php

namespace App\Http\Controllers\Web;

use App\Enums\BotTone;
use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BusinessSetupController extends Controller
{
    protected function getIndustryOptions()
    {
        return ['Retail', 'E-commerce', 'Food & Beverage', 'Health & Beauty', 'Travel', 'Education', 'Finance', 'Entertainment', 'Other'];
    }

    public function create()
    {
        return Inertia::render('Business/Setup', [
            'industries' => $this->getIndustryOptions(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'industry' => ['required', Rule::in($this->getIndustryOptions())],
        ]);

        $business = Business::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'phone' => $request->phone,
            'industry' => $request->industry, // store as-is
            'currency' => 'NGN',
        ]);

        // Create bot for the business with default configuration
        $business->bot()->create([
            'name' => $request->name . ' Assistant',
            'description' => "AI assistant for {$request->name}, helping customers browse products and place orders.",
            'avatar' => 'https://avatar.iran.liara.run/public/boy?username=' . urlencode($request->name),
            'persona' => json_encode([
                'role' => 'assistant',
                'instructions' => "You are a helpful AI assistant for {$request->name}, a business in the {$request->industry} industry. You are friendly, professional, and always ready to help customers."
            ]),
            'tone' => BotTone::FRIENDLY,
            'active' => true,
        ]);

        // Store the active business ID in session
        session(['active_business_id' => $business->id]);

        return redirect()->route('business.dashboard', $business);
    }
}
