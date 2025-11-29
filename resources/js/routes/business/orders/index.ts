import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\OrderController::index
* @see app/Http/Controllers/Web/OrderController.php:13
* @route '/{business}/orders'
*/
export const index = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{business}/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\OrderController::index
* @see app/Http/Controllers/Web/OrderController.php:13
* @route '/{business}/orders'
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
* @see \App\Http\Controllers\Web\OrderController::index
* @see app/Http/Controllers/Web/OrderController.php:13
* @route '/{business}/orders'
*/
index.get = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\OrderController::index
* @see app/Http/Controllers/Web/OrderController.php:13
* @route '/{business}/orders'
*/
index.head = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\OrderController::show
* @see app/Http/Controllers/Web/OrderController.php:44
* @route '/{business}/orders/{order}'
*/
export const show = (args: { business: string | { slug: string }, order: number | { id: number } } | [business: string | { slug: string }, order: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{business}/orders/{order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\OrderController::show
* @see app/Http/Controllers/Web/OrderController.php:44
* @route '/{business}/orders/{order}'
*/
show.url = (args: { business: string | { slug: string }, order: number | { id: number } } | [business: string | { slug: string }, order: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            business: args[0],
            order: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        business: typeof args.business === 'object'
        ? args.business.slug
        : args.business,
        order: typeof args.order === 'object'
        ? args.order.id
        : args.order,
    }

    return show.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\OrderController::show
* @see app/Http/Controllers/Web/OrderController.php:44
* @route '/{business}/orders/{order}'
*/
show.get = (args: { business: string | { slug: string }, order: number | { id: number } } | [business: string | { slug: string }, order: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\OrderController::show
* @see app/Http/Controllers/Web/OrderController.php:44
* @route '/{business}/orders/{order}'
*/
show.head = (args: { business: string | { slug: string }, order: number | { id: number } } | [business: string | { slug: string }, order: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\OrderController::updateStatus
* @see app/Http/Controllers/Web/OrderController.php:104
* @route '/{business}/orders/{order}/status'
*/
export const updateStatus = (args: { business: string | { slug: string }, order: number | { id: number } } | [business: string | { slug: string }, order: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

updateStatus.definition = {
    methods: ["put"],
    url: '/{business}/orders/{order}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\OrderController::updateStatus
* @see app/Http/Controllers/Web/OrderController.php:104
* @route '/{business}/orders/{order}/status'
*/
updateStatus.url = (args: { business: string | { slug: string }, order: number | { id: number } } | [business: string | { slug: string }, order: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            business: args[0],
            order: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        business: typeof args.business === 'object'
        ? args.business.slug
        : args.business,
        order: typeof args.order === 'object'
        ? args.order.id
        : args.order,
    }

    return updateStatus.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\OrderController::updateStatus
* @see app/Http/Controllers/Web/OrderController.php:104
* @route '/{business}/orders/{order}/status'
*/
updateStatus.put = (args: { business: string | { slug: string }, order: number | { id: number } } | [business: string | { slug: string }, order: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

const orders = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    updateStatus: Object.assign(updateStatus, updateStatus),
}

export default orders