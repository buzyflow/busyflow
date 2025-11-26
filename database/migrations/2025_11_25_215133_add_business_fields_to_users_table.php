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
            $table->string('business_name')->after('email');
            $table->string('vendor_whatsapp')->nullable()->after('business_name');
            $table->string('bot_name')->default('Bot')->after('vendor_whatsapp');
            $table->string('avatar_color')->default('indigo')->after('bot_name');
            $table->text('custom_instructions')->nullable()->after('avatar_color');
            $table->string('currency')->default('NGN')->after('custom_instructions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'business_name',
                'vendor_whatsapp',
                'bot_name',
                'avatar_color',
                'custom_instructions',
                'currency',
            ]);
        });
    }
};
