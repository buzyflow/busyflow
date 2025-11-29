<?php

namespace App\DataTransferObjects\Cart;

use Illuminate\Support\Collection;

readonly class CartSummaryData
{
    public function __construct(
        /** @var Collection<int, CartItemData> */
        public Collection $items,
        public float $total,
        public string $currency,
        public int $count,
    ) {}

    public function toArray(): array
    {
        return [
            'items' => $this->items->map(fn(CartItemData $item) => $item->toArray()),
            'total' => $this->total,
            'currency' => $this->currency,
            'count' => $this->count,
        ];
    }
}
