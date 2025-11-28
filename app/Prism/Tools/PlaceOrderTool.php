<?php

namespace App\Prism\Tools;

use App\Models\Business;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Prism\Prism\Tool;

class PlaceOrderTool extends Tool
{
    public function __construct(public Business $business, public Customer $customer)
    {
        $this->as('placeOrder')
            ->for('Finalize and place the order for the customer.')
            ->using($this);
    }

    public function __invoke(): string
    {
        try {
            Log::info('PlaceOrderTool called', [
                'business_id' => $this->business->id,
                'customer_id' => $this->customer->id,
            ]);

            // Pull the correct cart for this business
            $cart = $this->customer
                ->carts()
                ->where('business_id', $this->business->id)
                ->first();

            if (! $cart || $cart->items()->count() === 0) {
                Log::warning('PlaceOrderTool: Cart is empty');
                return json_encode([
                    'status' => 'error',
                    'message' => 'Cart is empty. Please add items before placing an order.'
                ]);
            }

            $customer = $this->customer;
            $total = 0;
            $currency = 'NGN';

            // Build item list
            $items = $cart->items()->with('product')->get();

            foreach ($items as $cartItem) {
                $total += $cartItem->price * $cartItem->quantity;
                $currency = $cartItem->currency;
            }

            // Generate unique order number
            $orderNumber = 'ORD-' . strtoupper(uniqid());

            // Create order record
            $order = Order::create([
                'customer_id'    => $customer->id,
                'business_id'    => $this->business->id,
                'order_number'   => $orderNumber,
                'customer_name'  => $customer->name,
                'customer_phone' => $customer->phone,
                'subtotal'       => $total,
                'total'          => $total,
                'currency'       => $currency,
                'status'         => 'PENDING',
                'payment_status' => 'UNPAID',
                'ordered_at'     => now(),
            ]);

            // Create order items
            foreach ($items as $cartItem) {
                $order->items()->create([
                    'product_id' => $cartItem->product_id,
                    'name'       => $cartItem->product->name,
                    'price'      => $cartItem->price,
                    'quantity'   => $cartItem->quantity,
                    'currency'   => $cartItem->currency,
                ]);
            }

            // Clear cart after order
            $cart->items()->delete();

            Log::info('PlaceOrderTool: Order placed successfully', [
                'order_id' => $order->id,
                'order_number' => $orderNumber,
                'total' => $total,
                'items_count' => $items->count(),
            ]);

            return json_encode([
                'status' => 'success',
                'message' => "Order placed successfully! Your order number is {$orderNumber}.",
                'order_id' => $order->id,
                'order_number' => $orderNumber,
                'total' => $total,
                'currency' => $currency
            ]);
        } catch (\Exception $e) {
            Log::error('PlaceOrderTool: Exception occurred', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return json_encode([
                'status' => 'error',
                'message' => 'Failed to place order. Please try again.'
            ]);
        }
    }
}
