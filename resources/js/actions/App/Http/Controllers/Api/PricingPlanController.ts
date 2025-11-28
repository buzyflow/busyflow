import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\PricingPlanController::index
* @see app/Http/Controllers/Api/PricingPlanController.php:15
* @route '/api/pricing-plans'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/pricing-plans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\PricingPlanController::index
* @see app/Http/Controllers/Api/PricingPlanController.php:15
* @route '/api/pricing-plans'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PricingPlanController::index
* @see app/Http/Controllers/Api/PricingPlanController.php:15
* @route '/api/pricing-plans'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\PricingPlanController::index
* @see app/Http/Controllers/Api/PricingPlanController.php:15
* @route '/api/pricing-plans'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const PricingPlanController = { index }

export default PricingPlanController