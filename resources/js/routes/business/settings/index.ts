import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import profile from './profile'
import password from './password'
import bot from './bot'
import account from './account'
/**
* @see \App\Http\Controllers\Web\SettingsController::index
* @see app/Http/Controllers/Web/SettingsController.php:20
* @route '/{business}/settings'
*/
export const index = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{business}/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\SettingsController::index
* @see app/Http/Controllers/Web/SettingsController.php:20
* @route '/{business}/settings'
*/
index.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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
* @see \App\Http\Controllers\Web\SettingsController::index
* @see app/Http/Controllers/Web/SettingsController.php:20
* @route '/{business}/settings'
*/
index.get = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\SettingsController::index
* @see app/Http/Controllers/Web/SettingsController.php:20
* @route '/{business}/settings'
*/
index.head = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

const settings = {
    index: Object.assign(index, index),
    profile: Object.assign(profile, profile),
    password: Object.assign(password, password),
    bot: Object.assign(bot, bot),
    account: Object.assign(account, account),
}

export default settings