<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class SettingsController extends Controller
{
    /**
     * Display the settings page.
     */
    public function index(Request $request, Business $business)
    {
        // Ensure the user owns the business (or is authorized)
        if ($request->user()->id !== $business->user_id) {
            abort(403);
        }

        return Inertia::render('Settings/Index', [
            'business' => $business,
            'bot' => $business->bot,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function updateProfile(Request $request, Business $business)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
        ]);

        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(Request $request, Business $business)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->back()->with('success', 'Password updated successfully.');
    }

    /**
     * Update the bot settings.
     */
    public function updateBot(Request $request, Business $business)
    {
        // Ensure the user owns the business
        if ($request->user()->id !== $business->user_id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'persona' => ['nullable', 'string', 'max:1000'],
            'tone' => ['required', 'string', 'in:professional,friendly,humorous,empathetic'],
        ]);

        $business->bot()->updateOrCreate(
            ['business_id' => $business->id],
            $validated
        );

        return redirect()->back()->with('success', 'Bot settings updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request, Business $business)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Ensure we are deleting the correct user context if needed, 
        // but typically user deletes their own account regardless of business context.
        // However, the route is scoped to business, so let's just proceed with user deletion.

        // Prefix email to allow re-registration
        $timestamp = now()->timestamp;
        $user->email = "deleted_{$timestamp}_{$user->email}";
        $user->save();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
