<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // For each existing business, create a Bot record with their bot data
        DB::table('businesses')->orderBy('id')->chunk(100, function ($businesses) {
            foreach ($businesses as $business) {
                // Generate default avatar URL using business name
                $avatarUrl = 'https://avatar-placeholder.iran.liara.run/username=' . urlencode($business->name);
                
                // Extract persona and tone from custom_instructions if available
                $persona = 'friendly and professional';
                $tone = 'warm';
                
                DB::table('bots')->insert([
                    'business_id' => $business->id,
                    'name' => $business->bot_name ?? ($business->name . ' Assistant'),
                    'description' => "AI assistant for {$business->name}",
                    'avatar' => $avatarUrl,
                    'persona' => $persona,
                    'tone' => $tone,
                    'active' => true,
                    'created_at' => $business->created_at,
                    'updated_at' => $business->updated_at,
                ]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Delete all bots
        DB::table('bots')->truncate();
    }
};
