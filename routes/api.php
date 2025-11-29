<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PlanController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductExtractionController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/users/{id}', [AuthController::class, 'getUserById']); // For bot loading
Route::get('/pricing-plans', [PlanController::class, 'index']); // Public pricing plans

// Paystack webhook
Route::post('/webhooks/paystack', [\App\Http\Controllers\Api\PaystackWebhookController::class, 'handle']);

// Chat (public - uses user_id parameter for context instead of auth)
Route::post('/chat', [ChatController::class, 'chat']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::put('/auth/user', [AuthController::class, 'updateUser']);

    // AI Product Extraction
    // Route::post('/products/extract', [ProductExtractionController::class, 'extract']);

    // Products
    Route::apiResource('products', ProductController::class);

    // Customers
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::get('/customers/by-phone', [CustomerController::class, 'byPhone']);

    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/{order}', [OrderController::class, 'update']);
});
