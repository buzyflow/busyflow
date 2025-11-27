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
        // Add business_id to products table
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('business_id')->nullable()->after('id')->constrained()->onDelete('cascade');
        });

        // Add business_id to customers table
        Schema::table('customers', function (Blueprint $table) {
            $table->foreignId('business_id')->nullable()->after('id')->constrained()->onDelete('cascade');
        });

        // Add business_id to orders table
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('business_id')->nullable()->after('id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['business_id']);
            $table->dropColumn('business_id');
        });

        Schema::table('customers', function (Blueprint $table) {
            $table->dropForeign(['business_id']);
            $table->dropColumn('business_id');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['business_id']);
            $table->dropColumn('business_id');
        });
    }
};
