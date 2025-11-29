<?php

namespace App\DataTransferObjects\Cart;

use App\Models\Product;

readonly class CartItemData
{
    public function __construct(
        public int $id,
        public int $productId,
        public string $productName,
        public ?string $productImage,
        public int $quantity,
        public float $price,
        public string $currency,
        public float $subtotal,
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->productId,
            'product_name' => $this->productName,
            'product_image' => $this->productImage,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'currency' => $this->currency,
            'subtotal' => $this->subtotal,
        ];
    }
}
