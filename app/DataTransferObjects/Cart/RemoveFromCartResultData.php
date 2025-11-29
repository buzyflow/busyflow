<?php

namespace App\DataTransferObjects\Cart;

use App\Models\Product;

readonly class RemoveFromCartResultData
{
    public function __construct(
        public Product $product,
    ) {}
}
