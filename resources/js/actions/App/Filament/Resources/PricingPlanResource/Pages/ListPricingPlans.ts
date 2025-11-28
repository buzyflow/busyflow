import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\ListPricingPlans::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/ListPricingPlans.php:7
* @route '/admin/pricing-plans'
*/
const ListPricingPlans = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPricingPlans.url(options),
    method: 'get',
})

ListPricingPlans.definition = {
    methods: ["get","head"],
    url: '/admin/pricing-plans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\ListPricingPlans::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/ListPricingPlans.php:7
* @route '/admin/pricing-plans'
*/
ListPricingPlans.url = (options?: RouteQueryOptions) => {
    return ListPricingPlans.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\ListPricingPlans::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/ListPricingPlans.php:7
* @route '/admin/pricing-plans'
*/
ListPricingPlans.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPricingPlans.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\ListPricingPlans::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/ListPricingPlans.php:7
* @route '/admin/pricing-plans'
*/
ListPricingPlans.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListPricingPlans.url(options),
    method: 'head',
})

export default ListPricingPlans