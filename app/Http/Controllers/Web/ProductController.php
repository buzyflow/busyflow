<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
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
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $businessId = session('active_business_id');
        
        if (!$businessId) {
            return redirect('/setup-business');
        }
        
        $business = auth()->user()->businesses()->findOrFail($businessId);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'nullable|integer|min:0',
            'category' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        // Handle image upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $imagePath = Storage::url($imagePath);
        }
        
        $product = Product::create([
            'business_id' => $businessId,
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'quantity' => $validated['quantity'] ?? 0,
            'currency' => $business->currency,
            'category' => $validated['category'] ?? 'Other',
            'image' => $imagePath,
        ]);
        
        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }

    public function bulkStore(Request $request)
    {
        $businessId = session('active_business_id');
        
        if (!$businessId) {
            return response()->json(['message' => 'No active business'], 401);
        }
        
        $business = auth()->user()->businesses()->findOrFail($businessId);
        
        $validated = $request->validate([
            'products' => 'required|array|min:1',
            'products.*.name' => 'required|string|max:255',
            'products.*.description' => 'nullable|string',
            'products.*.price' => 'required|numeric|min:0',
            'products.*.quantity' => 'nullable|integer|min:0',
            'products.*.category' => 'nullable|string|max:100',
        ]);
        
        $createdCount = 0;
        
        foreach ($validated['products'] as $productData) {
            Product::create([
                'business_id' => $businessId,
                'name' => $productData['name'],
                'description' => $productData['description'] ?? null,
                'price' => $productData['price'],
                'quantity' => $productData['quantity'] ?? 0,
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

    public function edit(Product $product)
    {
        // Ensure product belongs to active business
        if ($product->business_id !== session('active_business_id')) {
            abort(403);
        }
        
        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        // Ensure product belongs to active business
        if ($product->business_id !== session('active_business_id')) {
            abort(403);
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'nullable|integer|min:0',
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
        
        return redirect()->route('products.index')->with('success', 'Product updated successfully!');
    }

    public function destroy(Product $product)
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
        
        return redirect()->route('products.index')->with('success', 'Product deleted successfully!');
    }
}
