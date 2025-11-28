import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import products from './products'
import chat from './chat'
/**
* @see \App\Http\Controllers\Web\DashboardController::dashboard
* @see app/Http/Controllers/Web/DashboardController.php:14
* @route '/{business}/dashboard'
*/
export const dashboard = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(args, options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/{business}/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\DashboardController::dashboard
* @see app/Http/Controllers/Web/DashboardController.php:14
* @route '/{business}/dashboard'
*/
dashboard.url = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return dashboard.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\DashboardController::dashboard
* @see app/Http/Controllers/Web/DashboardController.php:14
* @route '/{business}/dashboard'
*/
dashboard.get = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\DashboardController::dashboard
* @see app/Http/Controllers/Web/DashboardController.php:14
* @route '/{business}/dashboard'
*/
dashboard.head = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(args, options),
    method: 'head',
})

const business = {
    dashboard: Object.assign(dashboard, dashboard),
    products: Object.assign(products, products),
    chat: Object.assign(chat, chat),
}

export default business