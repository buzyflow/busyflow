import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\SettingsController::destroy
* @see app/Http/Controllers/Web/SettingsController.php:102
* @route '/{business}/settings/account'
*/
export const destroy = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{business}/settings/account',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\SettingsController::destroy
* @see app/Http/Controllers/Web/SettingsController.php:102
* @route '/{business}/settings/account'
*/
destroy.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\SettingsController::destroy
* @see app/Http/Controllers/Web/SettingsController.php:102
* @route '/{business}/settings/account'
*/
destroy.delete = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const account = {
    destroy: Object.assign(destroy, destroy),
}

export default account