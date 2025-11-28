import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\ListPricingPlans::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/ListPricingPlans.php:7
* @route '/admin/pricing-plans'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/pricing-plans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\ListPricingPlans::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/ListPricingPlans.php:7
* @route '/admin/pricing-plans'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\ListPricingPlans::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/ListPricingPlans.php:7
* @route '/admin/pricing-plans'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\ListPricingPlans::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/ListPricingPlans.php:7
* @route '/admin/pricing-plans'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\CreatePricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/CreatePricingPlan.php:7
* @route '/admin/pricing-plans/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/pricing-plans/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\CreatePricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/CreatePricingPlan.php:7
* @route '/admin/pricing-plans/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\CreatePricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/CreatePricingPlan.php:7
* @route '/admin/pricing-plans/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\CreatePricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/CreatePricingPlan.php:7
* @route '/admin/pricing-plans/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\EditPricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/EditPricingPlan.php:7
* @route '/admin/pricing-plans/{record}/edit'
*/
export const edit = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/pricing-plans/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\EditPricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/EditPricingPlan.php:7
* @route '/admin/pricing-plans/{record}/edit'
*/
edit.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\EditPricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/EditPricingPlan.php:7
* @route '/admin/pricing-plans/{record}/edit'
*/
edit.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PricingPlanResource\Pages\EditPricingPlan::__invoke
* @see app/Filament/Resources/PricingPlanResource/Pages/EditPricingPlan.php:7
* @route '/admin/pricing-plans/{record}/edit'
*/
edit.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

const pricingPlans = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    edit: Object.assign(edit, edit),
}

export default pricingPlans