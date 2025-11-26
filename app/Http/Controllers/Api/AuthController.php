<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'business_name' => 'required|string',
        ]);

        $user = User::create([
            'name' => $request->business_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'business_name' => $request->business_name,
            'bot_name' => 'Bot',
            'avatar_color' => 'indigo',
            'currency' => 'NGN',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }

    /**
     * Get user by ID (public endpoint for bot loading)
     */
    public function getUserById(string $id)
    {
        $user = \App\Models\User::find($id);

        if (! $user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['user' => $user]);
    }

    public function updateUser(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'business_name' => 'sometimes|string',
            'vendor_whatsapp' => 'nullable|string',
            'bot_name' => 'sometimes|string',
            'avatar_color' => 'sometimes|string',
            'custom_instructions' => 'nullable|string',
            'currency' => 'sometimes|string',
        ]);

        $user->update($validated);

        return response()->json(['user' => $user]);
    }
}
