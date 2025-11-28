import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../wayfinder'
/**
* @see \App\Http\Controllers\Web\AuthController::register
* @see app/Http/Controllers/Web/AuthController.php:15
* @route '/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AuthController::register
* @see app/Http/Controllers/Web/AuthController.php:15
* @route '/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AuthController::register
* @see app/Http/Controllers/Web/AuthController.php:15
* @route '/register'
*/
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\AuthController::register
* @see app/Http/Controllers/Web/AuthController.php:15
* @route '/register'
*/
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\AuthController::login
* @see app/Http/Controllers/Web/AuthController.php:41
* @route '/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AuthController::login
* @see app/Http/Controllers/Web/AuthController.php:41
* @route '/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AuthController::login
* @see app/Http/Controllers/Web/AuthController.php:41
* @route '/login'
*/
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\AuthController::login
* @see app/Http/Controllers/Web/AuthController.php:41
* @route '/login'
*/
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\AuthController::logout
* @see app/Http/Controllers/Web/AuthController.php:80
* @route '/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\AuthController::logout
* @see app/Http/Controllers/Web/AuthController.php:80
* @route '/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AuthController::logout
* @see app/Http/Controllers/Web/AuthController.php:80
* @route '/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Web\BusinessSetupController::setupBusiness
* @see app/Http/Controllers/Web/BusinessSetupController.php:19
* @route '/setup-business'
*/
export const setupBusiness = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setupBusiness.url(options),
    method: 'get',
})

setupBusiness.definition = {
    methods: ["get","head"],
    url: '/setup-business',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\BusinessSetupController::setupBusiness
* @see app/Http/Controllers/Web/BusinessSetupController.php:19
* @route '/setup-business'
*/
setupBusiness.url = (options?: RouteQueryOptions) => {
    return setupBusiness.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\BusinessSetupController::setupBusiness
* @see app/Http/Controllers/Web/BusinessSetupController.php:19
* @route '/setup-business'
*/
setupBusiness.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setupBusiness.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\BusinessSetupController::setupBusiness
* @see app/Http/Controllers/Web/BusinessSetupController.php:19
* @route '/setup-business'
*/
setupBusiness.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setupBusiness.url(options),
    method: 'head',
})

