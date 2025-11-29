<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return \Inertia\Inertia::render('Home');
});




Route::middleware('guest')->group(function () {
    Route::get('/register', [\App\Http\Controllers\Web\AuthController::class, 'create'])->name('register');
    Route::post('/register', [\App\Http\Controllers\Web\AuthController::class, 'store']);

    Route::get('/login', [\App\Http\Controllers\Web\AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [\App\Http\Controllers\Web\AuthController::class, 'login']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\Web\AuthController::class, 'logout'])->name('logout');

    Route::get('/setup-business', [\App\Http\Controllers\Web\BusinessSetupController::class, 'create'])->name('setup-business');
    Route::post('/setup-business', [\App\Http\Controllers\Web\BusinessSetupController::class, 'store']);

    // Subscription routes
    Route::get('/subscription', [\App\Http\Controllers\Web\SubscriptionController::class, 'index'])->name('subscription.index');
    Route::get('/subscription/plans', [\App\Http\Controllers\Web\SubscriptionController::class, 'plans'])->name('subscription.plans');
    Route::get('/subscription/subscribe/{plan}', [\App\Http\Controllers\Web\SubscriptionController::class, 'create'])->name('subscription.create');
    Route::get('/subscription/callback', [\App\Http\Controllers\Web\SubscriptionController::class, 'callback'])->name('subscription.callback');
    Route::post('/subscription/cancel', [\App\Http\Controllers\Web\SubscriptionController::class, 'cancel'])->name('subscription.cancel');
    Route::post('/subscription/resume', [\App\Http\Controllers\Web\SubscriptionController::class, 'resume'])->name('subscription.resume');

    Route::middleware(['has.business', 'business.owner'])->prefix('{business:slug}')->name('business.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Web\DashboardController::class, 'index'])->name('dashboard');

        Route::post('/products/bulk', [\App\Http\Controllers\Web\ProductController::class, 'bulkStore'])->name('products.bulk');
        Route::resource('products', \App\Http\Controllers\Web\ProductController::class);
        Route::get('/orders', [\App\Http\Controllers\Web\OrderController::class, 'index'])->name('orders.index');
        Route::get('/orders/{order}', [\App\Http\Controllers\Web\OrderController::class, 'show'])->name('orders.show');
        Route::put('/orders/{order}/status', [\App\Http\Controllers\Web\OrderController::class, 'updateStatus'])->name('orders.updateStatus');

        // AI Product Extraction
        Route::post('/products/extract', [\App\Http\Controllers\Api\ProductExtractionController::class, 'extract'])->name('products.extract');

        // Settings
        Route::get('/settings', [\App\Http\Controllers\Web\SettingsController::class, 'index'])->name('settings.index');
        Route::put('/settings/profile', [\App\Http\Controllers\Web\SettingsController::class, 'updateProfile'])->name('settings.profile.update');
        Route::put('/settings/password', [\App\Http\Controllers\Web\SettingsController::class, 'updatePassword'])->name('settings.password.update');
        Route::put('/settings/bot', [\App\Http\Controllers\Web\SettingsController::class, 'updateBot'])->name('settings.bot.update');
        Route::delete('/settings/account', [\App\Http\Controllers\Web\SettingsController::class, 'destroy'])->name('settings.account.destroy');
    });
});


Route::prefix('{business:slug}')->name('business.chat.')->group(function () {
    // Public chat routes (no auth required for customers)
    Route::get('/chat', [\App\Http\Controllers\Web\ChatController::class, 'index'])
        ->name('index');
    Route::post('/chat/start', [\App\Http\Controllers\Web\ChatController::class, 'start'])->name('start');
    Route::post('/chat/send', [\App\Http\Controllers\Web\ChatController::class, 'send'])->name('send');
    Route::post('/chat/messages', [\App\Http\Controllers\Web\ChatController::class, 'messages'])
        ->name('messages');
    Route::get('/chat/cart', [\App\Http\Controllers\Web\ChatController::class, 'getCart'])->name('cart');
});
