<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => 'Admin User',
            'email' => 'admin@orderflow.test',
            'password' => bcrypt('password'),
            'is_admin' => true,
            'business_name' => 'OrderFlow Admin',
            'bot_name' => 'Admin Bot',
            'avatar_color' => '#3B82F6',
            'currency' => 'USD',
        ]);
    }
}
