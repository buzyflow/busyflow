import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\OrderController::index
* @see app/Http/Controllers/Api/OrderController.php:11
* @route '/api/orders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\OrderController::index
* @see app/Http/Controllers/Api/OrderController.php:11
* @route '/api/orders'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OrderController::index
* @see app/Http/Controllers/Api/OrderController.php:11
* @route '/api/orders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\OrderController::index
* @see app/Http/Controllers/Api/OrderController.php:11
* @route '/api/orders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\OrderController::store
* @see app/Http/Controllers/Api/OrderController.php:18
* @route '/api/orders'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\OrderController::store
* @see app/Http/Controllers/Api/OrderController.php:18
* @route '/api/orders'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OrderController::store
* @see app/Http/Controllers/Api/OrderController.php:18
* @route '/api/orders'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\OrderController::update
* @see app/Http/Controllers/Api/OrderController.php:34
* @route '/api/orders/{order}'
*/
export const update = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/orders/{order}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\OrderController::update
* @see app/Http/Controllers/Api/OrderController.php:34
* @route '/api/orders/{order}'
*/
update.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order: typeof args.order === 'object'
        ? args.order.id
        : args.order,
    }

    return update.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OrderController::update
* @see app/Http/Controllers/Api/OrderController.php:34
* @route '/api/orders/{order}'
*/
update.put = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

const OrderController = { index, store, update }

export default OrderController