<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PaystackService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaystackWebhookController extends Controller
{
    public function __construct(protected PaystackService $paystackService) {}

    /**
     * Handle Paystack webhook.
     */
    public function handle(Request $request)
    {
        // Verify webhook signature
        $signature = $request->header('x-paystack-signature');
        $body = $request->getContent();

        $expectedSignature = hash_hmac('sha512', $body, config('paystack.secret_key'));

        if ($signature !== $expectedSignature) {
            Log::warning('Invalid Paystack webhook signature');
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        $payload = $request->all();

        try {
            $this->paystackService->handleWebhook($payload);

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error('Paystack webhook handling failed', [
                'error' => $e->getMessage(),
                'payload' => $payload,
            ]);

            return response()->json(['error' => 'Webhook handling failed'], 500);
        }
    }
}
