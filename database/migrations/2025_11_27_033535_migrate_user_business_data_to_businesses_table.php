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
        // For each existing user, create a Business record with their business data
        DB::table('users')->orderBy('id')->chunk(100, function ($users) {
            foreach ($users as $user) {
                // Create business from user data
                $businessId = DB::table('businesses')->insertGetId([
                    'user_id' => $user->id,
                    'name' => $user->business_name ?? $user->name,
                    'phone' => $user->vendor_whatsapp ?? null,
                    'industry' => null, // New field, will be set during business setup
                    'bot_name' => $user->bot_name ?? 'Bot',
                    'avatar_color' => $user->avatar_color ?? 'indigo',
                    'currency' => $user->currency ?? 'NGN',
                    'welcome_message' => $user->welcome_message ?? null,
                    'custom_instructions' => $user->custom_instructions ?? null,
                    'business_details' => $user->business_details ?? null,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ]);

                // Update products to use business_id
                DB::table('products')
                    ->where('user_id', $user->id)
                    ->update(['business_id' => $businessId]);

                // Update customers to use business_id
                DB::table('customers')
                    ->where('vendor_id', $user->id)
                    ->update(['business_id' => $businessId]);

                // Update orders to use business_id
                DB::table('orders')
                    ->where('vendor_id', $user->id)
                    ->update(['business_id' => $businessId]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // This migration is not easily reversible
        // You would need to move data back from businesses to users
        // and update foreign keys back to user_id/vendor_id
    }
};
