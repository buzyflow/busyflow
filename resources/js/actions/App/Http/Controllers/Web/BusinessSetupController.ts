import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\BusinessSetupController::create
* @see app/Http/Controllers/Web/BusinessSetupController.php:20
* @route '/setup-business'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/setup-business',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\BusinessSetupController::create
* @see app/Http/Controllers/Web/BusinessSetupController.php:20
* @route '/setup-business'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\BusinessSetupController::create
* @see app/Http/Controllers/Web/BusinessSetupController.php:20
* @route '/setup-business'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\BusinessSetupController::create
* @see app/Http/Controllers/Web/BusinessSetupController.php:20
* @route '/setup-business'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\BusinessSetupController::store
* @see app/Http/Controllers/Web/BusinessSetupController.php:27
* @route '/setup-business'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/setup-business',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\BusinessSetupController::store
* @see app/Http/Controllers/Web/BusinessSetupController.php:27
* @route '/setup-business'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\BusinessSetupController::store
* @see app/Http/Controllers/Web/BusinessSetupController.php:27
* @route '/setup-business'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const BusinessSetupController = { create, store }

export default BusinessSetupController