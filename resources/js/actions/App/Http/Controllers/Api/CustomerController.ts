import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\CustomerController::index
* @see app/Http/Controllers/Api/CustomerController.php:11
* @route '/api/customers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/customers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CustomerController::index
* @see app/Http/Controllers/Api/CustomerController.php:11
* @route '/api/customers'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CustomerController::index
* @see app/Http/Controllers/Api/CustomerController.php:11
* @route '/api/customers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CustomerController::index
* @see app/Http/Controllers/Api/CustomerController.php:11
* @route '/api/customers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\CustomerController::store
* @see app/Http/Controllers/Api/CustomerController.php:18
* @route '/api/customers'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/customers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\CustomerController::store
* @see app/Http/Controllers/Api/CustomerController.php:18
* @route '/api/customers'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CustomerController::store
* @see app/Http/Controllers/Api/CustomerController.php:18
* @route '/api/customers'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\CustomerController::byPhone
* @see app/Http/Controllers/Api/CustomerController.php:36
* @route '/api/customers/by-phone'
*/
export const byPhone = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byPhone.url(options),
    method: 'get',
})

byPhone.definition = {
    methods: ["get","head"],
    url: '/api/customers/by-phone',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CustomerController::byPhone
* @see app/Http/Controllers/Api/CustomerController.php:36
* @route '/api/customers/by-phone'
*/
byPhone.url = (options?: RouteQueryOptions) => {
    return byPhone.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CustomerController::byPhone
* @see app/Http/Controllers/Api/CustomerController.php:36
* @route '/api/customers/by-phone'
*/
byPhone.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byPhone.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CustomerController::byPhone
* @see app/Http/Controllers/Api/CustomerController.php:36
* @route '/api/customers/by-phone'
*/
byPhone.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byPhone.url(options),
    method: 'head',
})

const CustomerController = { index, store, byPhone }

export default CustomerController