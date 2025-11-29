<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Paystack API Keys
    |--------------------------------------------------------------------------
    |
    | Your Paystack API keys. You can get these from your Paystack dashboard.
    | Use test keys for development and live keys for production.
    |
    */

    'public_key' => env('PAYSTACK_PUBLIC_KEY'),
    'secret_key' => env('PAYSTACK_SECRET_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Payment URL
    |--------------------------------------------------------------------------
    |
    | The base URL for Paystack API calls.
    |
    */

    'payment_url' => env('PAYSTACK_PAYMENT_URL', 'https://api.paystack.co'),

    /*
    |--------------------------------------------------------------------------
    | Merchant Email
    |--------------------------------------------------------------------------
    |
    | The email address associated with your Paystack account.
    |
    */

    'merchant_email' => env('PAYSTACK_MERCHANT_EMAIL', env('MAIL_FROM_ADDRESS')),

    /*
    |--------------------------------------------------------------------------
    | Currency
    |--------------------------------------------------------------------------
    |
    | The default currency for transactions. Paystack supports NGN, GHS, ZAR, USD.
    |
    */

    'currency' => env('PAYSTACK_CURRENCY', 'NGN'),
];
