import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\SettingsController::update
* @see app/Http/Controllers/Web/SettingsController.php:60
* @route '/{business}/settings/password'
*/
export const update = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{business}/settings/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\SettingsController::update
* @see app/Http/Controllers/Web/SettingsController.php:60
* @route '/{business}/settings/password'
*/
update.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\SettingsController::update
* @see app/Http/Controllers/Web/SettingsController.php:60
* @route '/{business}/settings/password'
*/
update.put = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

const password = {
    update: Object.assign(update, update),
}

export default password