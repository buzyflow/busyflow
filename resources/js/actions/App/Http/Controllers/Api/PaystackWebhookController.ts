import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\PaystackWebhookController::handle
* @see app/Http/Controllers/Api/PaystackWebhookController.php:17
* @route '/api/webhooks/paystack'
*/
export const handle = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

handle.definition = {
    methods: ["post"],
    url: '/api/webhooks/paystack',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\PaystackWebhookController::handle
* @see app/Http/Controllers/Api/PaystackWebhookController.php:17
* @route '/api/webhooks/paystack'
*/
handle.url = (options?: RouteQueryOptions) => {
    return handle.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PaystackWebhookController::handle
* @see app/Http/Controllers/Api/PaystackWebhookController.php:17
* @route '/api/webhooks/paystack'
*/
handle.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

const PaystackWebhookController = { handle }

export default PaystackWebhookController