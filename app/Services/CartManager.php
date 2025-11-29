<?php

namespace App\Services;

use App\DataTransferObjects\Cart\AddToCartResultData;
use App\DataTransferObjects\Cart\CartItemData;
use App\DataTransferObjects\Cart\CartSummaryData;
use App\DataTransferObjects\Cart\RemoveFromCartResultData;
use App\Models\Business;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Support\Collection;

class CartManager
{
    public function __construct(
        protected Business $business,
        protected Customer $customer
    ) {}

    /**
     * Get or create the cart for the current customer and business.
     */
    public function getCart(): Cart
    {
        return $this->customer
            ->carts()
            ->firstOrCreate(['business_id' => $this->business->id]);
    }

    /**
     * Add a product to the cart.
     */
    public function addToCart(int $productId, int $quantity = 1): AddToCartResultData
    {
        $product = Product::where('business_id', $this->business->id)
            ->where('id', $productId)
            ->first();

        if (! $product) {
            throw new \Exception("Product with ID {$productId} not found in catalog. Please use the exact product ID from the getProducts tool.");
        }

        $cart = $this->getCart();

        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $quantity);
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
                'currency' => $product->currency,
            ]);
        }

        return new AddToCartResultData(
            product: $product,
            quantityAdded: $quantity,
        );
    }

    /**
     * Remove a product from the cart.
     */
    public function removeFromCart(int $productId): RemoveFromCartResultData
    {
        $product = Product::where('business_id', $this->business->id)
            ->where('id', $productId)
            ->first();

        if (! $product) {
            throw new \Exception("Product not found in this business catalog.");
        }

        $cart = $this->customer
            ->carts()
            ->where('business_id', $this->business->id)
            ->first();

        if (! $cart) {
            throw new \Exception("Cart is empty.");
        }

        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if (! $cartItem) {
            throw new \Exception("Product is not in your cart.");
        }

        $cartItem->delete();

        return new RemoveFromCartResultData(
            product: $product,
        );
    }

    /**
     * Get formatted cart items.
     * 
     * @return Collection<int, CartItemData>
     */
    public function getCartItems(): Collection
    {
        $cart = $this->customer
            ->carts()
            ->where('business_id', $this->business->id)
            ->first();

        if (! $cart) {
            return collect([]);
        }

        return $cart->items()->with('product')->get()->map(function ($item) {
            return new CartItemData(
                id: $item->id,
                productId: $item->product_id,
                productName: $item->product->name,
                productImage: $item->product->image,
                quantity: $item->quantity,
                price: $item->price,
                currency: $item->currency,
                subtotal: $item->quantity * $item->price,
            );
        });
    }

    /**
     * Get cart summary (total, currency, items count).
     */
    public function getCartSummary(): CartSummaryData
    {
        $items = $this->getCartItems();
        $total = $items->sum('subtotal');
        $currency = $items->first()?->currency ?? 'NGN';

        return new CartSummaryData(
            items: $items,
            total: $total,
            currency: $currency,
            count: $items->count(),
        );
    }

    /**
     * Clear the cart.
     */
    public function clearCart(): void
    {
        $cart = $this->customer
            ->carts()
            ->where('business_id', $this->business->id)
            ->first();

        if ($cart) {
            $cart->items()->delete();
        }
    }

    /**
     * Place an order from the current cart.
     */
    public function placeOrder(): Order
    {
        $summary = $this->getCartSummary();

        if ($summary->items->isEmpty()) {
            throw new \Exception("Cart is empty. Please add items before placing an order.");
        }

        // Generate unique order number
        $orderNumber = 'ORD-' . strtoupper(uniqid());

        // Create order record
        $order = Order::create([
            'customer_id'    => $this->customer->id,
            'business_id'    => $this->business->id,
            'order_number'   => $orderNumber,
            'customer_name'  => $this->customer->name,
            'customer_phone' => $this->customer->phone,
            'subtotal'       => $summary->total,
            'total'          => $summary->total,
            'currency'       => $summary->currency,
            'status'         => 'PENDING',
            'payment_status' => 'UNPAID',
            'ordered_at'     => now(),
        ]);

        // Create order items
        foreach ($summary->items as $item) {
            $order->items()->create([
                'product_id' => $item->productId,
                'name'       => $item->productName,
                'price'      => $item->price,
                'quantity'   => $item->quantity,
                'currency'   => $item->currency,
            ]);
        }

        // Clear cart after order
        $this->clearCart();

        return $order;
    }
}
