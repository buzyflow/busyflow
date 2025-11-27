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
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn([
                'bot_name',
                'avatar_color',
                'welcome_message',
                'custom_instructions',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->string('bot_name')->default('Bot');
            $table->string('avatar_color')->default('indigo');
            $table->text('welcome_message')->nullable();
            $table->text('custom_instructions')->nullable();
        });
    }
};
