<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable as Auth;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model implements Authenticatable
{
    use HasFactory, Auth;

    protected $fillable = [
        'business_id',
        'phone',
        'name',
        'last_active',
    ];

    protected $casts = [
        'last_active' => 'datetime',
    ];

    /**
     * Customer can have carts for multiple businesses.
     */
    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    /**
     * Customer can have orders across multiple businesses.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
