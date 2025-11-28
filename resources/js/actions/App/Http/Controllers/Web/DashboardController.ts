import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\DashboardController::index
* @see app/Http/Controllers/Web/DashboardController.php:14
* @route '/{business}/dashboard'
*/
export const index = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{business}/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\DashboardController::index
* @see app/Http/Controllers/Web/DashboardController.php:14
* @route '/{business}/dashboard'
*/
index.url = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { business: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { business: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            business: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        business: typeof args.business === 'object'
        ? args.business.slug
        : args.business,
    }

    return index.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\DashboardController::index
* @see app/Http/Controllers/Web/DashboardController.php:14
* @route '/{business}/dashboard'
*/
index.get = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\DashboardController::index
* @see app/Http/Controllers/Web/DashboardController.php:14
* @route '/{business}/dashboard'
*/
index.head = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

const DashboardController = { index }

export default DashboardController