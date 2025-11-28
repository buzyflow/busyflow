<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
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

    Route::middleware(['has.business', 'business.owner'])->prefix('{business:slug}')->name('business.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Web\DashboardController::class, 'index'])->name('dashboard');

        Route::post('/products/bulk', [\App\Http\Controllers\Web\ProductController::class, 'bulkStore'])->name('products.bulk');
        Route::resource('products', \App\Http\Controllers\Web\ProductController::class);

        // AI Product Extraction
        Route::post('/products/extract', [\App\Http\Controllers\Api\ProductExtractionController::class, 'extract'])->name('products.extract');
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
