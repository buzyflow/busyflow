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
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });

        Schema::table('customers', function (Blueprint $table) {
            // Drop unique index first if it exists
            $table->dropUnique(['vendor_id', 'phone']);
            $table->dropForeign(['vendor_id']);
            $table->dropColumn('vendor_id');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['vendor_id']);
            $table->dropColumn('vendor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
        });

        Schema::table('customers', function (Blueprint $table) {
            $table->foreignId('vendor_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->unique(['vendor_id', 'phone']);
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('vendor_id')->nullable()->constrained('users')->onDelete('cascade');
        });
    }
};
