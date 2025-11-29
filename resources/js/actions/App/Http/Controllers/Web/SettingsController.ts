import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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

/**
* @see \App\Http\Controllers\Web\SettingsController::updateProfile
* @see app/Http/Controllers/Web/SettingsController.php:37
* @route '/{business}/settings/profile'
*/
export const updateProfile = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProfile.url(args, options),
    method: 'put',
})

updateProfile.definition = {
    methods: ["put"],
    url: '/{business}/settings/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\SettingsController::updateProfile
* @see app/Http/Controllers/Web/SettingsController.php:37
* @route '/{business}/settings/profile'
*/
updateProfile.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return updateProfile.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\SettingsController::updateProfile
* @see app/Http/Controllers/Web/SettingsController.php:37
* @route '/{business}/settings/profile'
*/
updateProfile.put = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProfile.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Web\SettingsController::updatePassword
* @see app/Http/Controllers/Web/SettingsController.php:60
* @route '/{business}/settings/password'
*/
export const updatePassword = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(args, options),
    method: 'put',
})

updatePassword.definition = {
    methods: ["put"],
    url: '/{business}/settings/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\SettingsController::updatePassword
* @see app/Http/Controllers/Web/SettingsController.php:60
* @route '/{business}/settings/password'
*/
updatePassword.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return updatePassword.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\SettingsController::updatePassword
* @see app/Http/Controllers/Web/SettingsController.php:60
* @route '/{business}/settings/password'
*/
updatePassword.put = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Web\SettingsController::updateBot
* @see app/Http/Controllers/Web/SettingsController.php:77
* @route '/{business}/settings/bot'
*/
export const updateBot = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateBot.url(args, options),
    method: 'put',
})

updateBot.definition = {
    methods: ["put"],
    url: '/{business}/settings/bot',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\SettingsController::updateBot
* @see app/Http/Controllers/Web/SettingsController.php:77
* @route '/{business}/settings/bot'
*/
updateBot.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return updateBot.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\SettingsController::updateBot
* @see app/Http/Controllers/Web/SettingsController.php:77
* @route '/{business}/settings/bot'
*/
updateBot.put = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateBot.url(args, options),
    method: 'put',
})

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

const SettingsController = { index, updateProfile, updatePassword, updateBot, destroy }

export default SettingsController