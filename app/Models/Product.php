<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
        ];
    }

    /**
     * Get the image URL, or a placeholder if not set.
     */
    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ?? $this->getDefaultImage()
        );
    }

    /**
     * Get a default placeholder image based on category.
     */
    private function getDefaultImage(): string
    {
        $categorySeeds = [
            'Electronics' => 'tech',
            'Clothing' => 'fashion',
            'Food' => 'food',
            'Other' => 'product',
        ];
        
        $seed = $categorySeeds[$this->category] ?? 'product';
        
        return "https://picsum.photos/seed/{$seed}/400/300";
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
