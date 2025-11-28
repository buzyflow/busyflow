import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\CreatePricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/CreatePricingPlan.php:7
* @route '/admin/pricing-plans/create'
*/
const CreatePricingPlan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePricingPlan.url(options),
    method: 'get',
})

CreatePricingPlan.definition = {
    methods: ["get","head"],
    url: '/admin/pricing-plans/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\CreatePricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/CreatePricingPlan.php:7
* @route '/admin/pricing-plans/create'
*/
CreatePricingPlan.url = (options?: RouteQueryOptions) => {
    return CreatePricingPlan.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\CreatePricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/CreatePricingPlan.php:7
* @route '/admin/pricing-plans/create'
*/
CreatePricingPlan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePricingPlan.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\CreatePricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/CreatePricingPlan.php:7
* @route '/admin/pricing-plans/create'
*/
CreatePricingPlan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreatePricingPlan.url(options),
    method: 'head',
})

export default CreatePricingPlan