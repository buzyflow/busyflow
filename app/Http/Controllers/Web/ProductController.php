<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Business $business)
    {
        $businessId = session('active_business_id');

        if (!$businessId) {
            return redirect('/setup-business');
        }

        $products = Product::where('business_id', $businessId)
            ->latest()
            ->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'business' => $business
        ]);
    }

    public function create(Business $business)
    {
        return Inertia::render('Products/Create', [
            'business' => $business,
        ]);
    }

    public function store(Business $business, Request $request)
    {
        abort_unless($business->user_id == Auth::id(), 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:products',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'category' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'products.*.name.unique' => 'Product name (:input) already exists.',
        ]);

        // Handle image upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $imagePath = Storage::url($imagePath);
        }

        $business->products()->create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'stock' => $validated['stock'] ?? 0,
            'currency' => $business->currency,
            'category' => $validated['category'] ?? 'Other',
            'image' => $imagePath,
        ]);

        return redirect()->route('business.products.index', $business)->with('success', 'Product created successfully!');
    }

    public function bulkStore(Business $business, Request $request)
    {
        abort_unless($business->user_id == Auth::id(), 403);

        $validated = $request->validate([
            'products' => 'required|array|min:1',
            'products.*.name' => 'required|string|max:255|unique:products',
            'products.*.description' => 'nullable|string',
            'products.*.price' => 'required|numeric|min:0',
            'products.*.quantity' => 'nullable|integer|min:0',
            'products.*.category' => 'nullable|string|max:100',
        ], [
            'products.*.name.unique' => 'Product name (:input) already exists.',
        ]);

        $createdCount = 0;

        foreach ($validated['products'] as $productData) {
            Product::create([
                'business_id' => $business->id,
                'name' => $productData['name'],
                'description' => $productData['description'] ?? null,
                'price' => $productData['price'],
                'stock' => $productData['quantity'] ?? 0,
                'currency' => $business->currency,
                'category' => $productData['category'] ?? 'Other',
                'image' => null, // Bulk create doesn't support image upload yet
            ]);
            $createdCount++;
        }

        return response()->json([
            'success' => true,
            'message' => "Successfully created {$createdCount} products",
            'count' => $createdCount
        ]);
    }

    public function edit(Business $business, Product $product)
    {
        abort_unless($business->user_id == Auth::id(), 403);

        // Ensure product belongs to active business
        if ($product->business_id !== $business->id) {
            abort(403);
        }

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'business' => $business,
        ]);
    }

    public function update(Request $request, Business $business, Product $product)
    {
        // Ensure product belongs to active business
        if ($product->business_id !== session('active_business_id')) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'category' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image && str_starts_with($product->image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $product->image));
            }

            $imagePath = $request->file('image')->store('products', 'public');
            $validated['image'] = Storage::url($imagePath);
        }

        $product->update($validated);

        return redirect()->route('business.products.index', $business)->with('success', 'Product updated successfully!');
    }

    public function destroy(Business $business, Product $product)
    {
        // Ensure product belongs to active business
        if ($product->business_id !== session('active_business_id')) {
            abort(403);
        }

        // Delete image if exists
        if ($product->image && str_starts_with($product->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $product->image));
        }

        $product->delete();

        return redirect()->route('business.products.index', $business)->with('success', 'Product deleted successfully!');
    }
}
