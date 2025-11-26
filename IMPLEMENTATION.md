# Laravel Backend Implementation - Remaining Files

This document contains all the remaining code needed to complete the Laravel backend for BizyFlow.

## Models

### Product Model (`app/Models/Product.php`)
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'price',
        'currency',
        'category',
        'image',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

### Customer Model (`app/Models/Customer.php`)
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'phone',
        'name',
        'last_active',
    ];

    protected $casts = [
        'last_active' => 'datetime',
    ];

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
```

### Order Model (`app/Models/Order.php`)
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'customer_id',
        'customer_name',
        'customer_phone',
        'items',
        'total',
        'status',
        'order_timestamp',
    ];

    protected $casts = [
        'items' => 'array',
        'total' => 'decimal:2',
        'order_timestamp' => 'integer',
    ];

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
```

## Controllers

### AuthController (`app/Http/Controllers/Api/AuthController.php`)
```php
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

        if (!$user || !Hash::check($request->password, $user->password)) {
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
```

### ProductController (`app/Http/Controllers/Api/ProductController.php`)
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = $request->user()->products()->latest()->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'currency' => 'required|string',
            'category' => 'required|string',
            'image' => 'required|string',
        ]);

        $product = $request->user()->products()->create($validated);

        return response()->json($product, 201);
    }

    public function show(Request $request, Product $product)
    {
        $this->authorize('view', $product);
        return response()->json($product);
    }

    public function update(Request $request, Product $product)
    {
        $this->authorize('update', $product);

        $validated = $request->validate([
            'name' => 'sometimes|string',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'currency' => 'sometimes|string',
            'category' => 'sometimes|string',
            'image' => 'sometimes|string',
        ]);

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy(Request $request, Product $product)
    {
        $this->authorize('delete', $product);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
```

### CustomerController (`app/Http/Controllers/Api/CustomerController.php`)
```php
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
        $request->validate(['phone' => 'required|string']);

        $customer = $request->user()->customers()
            ->where('phone', $request->phone)
            ->first();

        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        return response()->json($customer);
    }
}
```

### OrderController (`app/Http/Controllers/Api/OrderController.php`)
```php
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

    public function update(Request $request, Order $product)
    {
        $this->authorize('update', $order);

        $validated = $request->validate([
            'status' => 'required|string|in:PENDING,CONFIRMED,SHIPPED,COMPLETE',
        ]);

        $order->update($validated);

        return response()->json($order);
    }
}
```

## API Routes (`routes/api.php`)

Add these routes to your `routes/api.php` file:

```php
<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::put('/auth/user', [AuthController::class, 'updateUser']);

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
```

## CORS Configuration (`config/cors.php`)

Update your CORS configuration:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],

'allowed_origins' => ['*'], // In production, specify your frontend URL

'allowed_methods' => ['*'],

'allowed_headers' => ['*'],

'supports_credentials' => true,
```

## Environment Variables

Add to `.env`:

```
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite

# Or for PostgreSQL in production:
# DB_CONNECTION=pgsql
# DB_HOST=your-db-host
# DB_DATABASE=bizyflow
# DB_USERNAME=your-username
# DB_PASSWORD=your-password

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
```

## Run Migrations

```bash
cd backend
php artisan migrate
```

## Test the API

```bash
cd backend
php artisan serve
```

API will be available at `http://localhost:8000/api`
