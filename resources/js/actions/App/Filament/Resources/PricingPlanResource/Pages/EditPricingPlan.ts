import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\EditPricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/EditPricingPlan.php:7
* @route '/admin/pricing-plans/{record}/edit'
*/
const EditPricingPlan = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditPricingPlan.url(args, options),
    method: 'get',
})

EditPricingPlan.definition = {
    methods: ["get","head"],
    url: '/admin/pricing-plans/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\EditPricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/EditPricingPlan.php:7
* @route '/admin/pricing-plans/{record}/edit'
*/
EditPricingPlan.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    if (Array.isArray(args)) {
        args = {
            record: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        record: args.record,
    }

    return EditPricingPlan.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\EditPricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/EditPricingPlan.php:7
* @route '/admin/pricing-plans/{record}/edit'
*/
EditPricingPlan.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditPricingPlan.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\EditPricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/EditPricingPlan.php:7
* @route '/admin/pricing-plans/{record}/edit'
*/
EditPricingPlan.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditPricingPlan.url(args, options),
    method: 'head',
})

export default EditPricingPlan