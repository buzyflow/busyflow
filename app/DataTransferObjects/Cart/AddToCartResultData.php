<?php

namespace App\DataTransferObjects\Cart;

use App\Models\Product;

readonly class AddToCartResultData
{
    public function __construct(
        public Product $product,
        public int $quantityAdded,
    ) {}
}
