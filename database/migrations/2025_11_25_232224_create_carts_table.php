<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id();

            // tenant (for scoping)
            $table->foreignId('business_id')
                ->constrained()
                ->cascadeOnDelete();

            // each customer has ONE active cart per business
            $table->foreignId('customer_id')
                ->constrained()
                ->cascadeOnDelete();

            // ensure customer cannot have two carts in SAME business
            $table->unique(['business_id', 'customer_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
