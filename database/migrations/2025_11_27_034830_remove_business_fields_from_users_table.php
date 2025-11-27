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
        Schema::table('users', function (Blueprint $table) {
            // Drop business-related columns that are now in the businesses table
            $table->dropColumn([
                'business_name',
                'vendor_whatsapp',
                'bot_name',
                'avatar_color',
                'currency',
                'welcome_message',
                'custom_instructions',
                'business_details',
                'phone',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Re-add the columns if we need to rollback
            $table->string('business_name')->nullable();
            $table->string('vendor_whatsapp')->nullable();
            $table->string('bot_name')->default('Bot');
            $table->string('avatar_color')->default('indigo');
            $table->string('currency')->default('NGN');
            $table->text('welcome_message')->nullable();
            $table->text('custom_instructions')->nullable();
            $table->json('business_details')->nullable();
            $table->string('phone')->nullable();
        });
    }
};
