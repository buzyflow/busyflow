<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-inertia', function () {
    return Inertia::render('Test', [
        'message' => 'Hello from Laravel!',
    ]);
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
    
    Route::get('/dashboard', [\App\Http\Controllers\Web\DashboardController::class, 'index'])->name('dashboard');
    
    Route::resource('products', \App\Http\Controllers\Web\ProductController::class);
});
