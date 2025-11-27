<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_id',
        'customer_id',
        'customer_name',
        'customer_phone',
        'items',
        'total',
        'currency',
        'status',
        'order_timestamp',
    ];

    protected $casts = [
        'items' => 'array',
        'total' => 'decimal:2',
        'order_timestamp' => 'integer',
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    /**
     * @deprecated Use business() instead
     */
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
