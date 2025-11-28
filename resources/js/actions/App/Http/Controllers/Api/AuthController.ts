import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AuthController::register
* @see app/Http/Controllers/Api/AuthController.php:13
* @route '/api/auth/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/api/auth/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AuthController::register
* @see app/Http/Controllers/Api/AuthController.php:13
* @route '/api/auth/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AuthController::register
* @see app/Http/Controllers/Api/AuthController.php:13
* @route '/api/auth/register'
*/
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AuthController::login
* @see app/Http/Controllers/Api/AuthController.php:39
* @route '/api/auth/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/api/auth/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AuthController::login
* @see app/Http/Controllers/Api/AuthController.php:39
* @route '/api/auth/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AuthController::login
* @see app/Http/Controllers/Api/AuthController.php:39
* @route '/api/auth/login'
*/
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AuthController::getUserById
* @see app/Http/Controllers/Api/AuthController.php:77
* @route '/api/users/{id}'
*/
export const getUserById = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUserById.url(args, options),
    method: 'get',
})

getUserById.definition = {
    methods: ["get","head"],
    url: '/api/users/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AuthController::getUserById
* @see app/Http/Controllers/Api/AuthController.php:77
* @route '/api/users/{id}'
*/
getUserById.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return getUserById.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AuthController::getUserById
* @see app/Http/Controllers/Api/AuthController.php:77
* @route '/api/users/{id}'
*/
getUserById.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUserById.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AuthController::getUserById
* @see app/Http/Controllers/Api/AuthController.php:77
* @route '/api/users/{id}'
*/
getUserById.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getUserById.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AuthController::logout
* @see app/Http/Controllers/Api/AuthController.php:62
* @route '/api/auth/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/api/auth/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AuthController::logout
* @see app/Http/Controllers/Api/AuthController.php:62
* @route '/api/auth/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AuthController::logout
* @see app/Http/Controllers/Api/AuthController.php:62
* @route '/api/auth/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AuthController::user
* @see app/Http/Controllers/Api/AuthController.php:69
* @route '/api/auth/user'
*/
export const user = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/api/auth/user',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AuthController::user
* @see app/Http/Controllers/Api/AuthController.php:69
* @route '/api/auth/user'
*/
user.url = (options?: RouteQueryOptions) => {
    return user.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AuthController::user
* @see app/Http/Controllers/Api/AuthController.php:69
* @route '/api/auth/user'
*/
user.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AuthController::user
* @see app/Http/Controllers/Api/AuthController.php:69
* @route '/api/auth/user'
*/
user.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AuthController::updateUser
* @see app/Http/Controllers/Api/AuthController.php:88
* @route '/api/auth/user'
*/
export const updateUser = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUser.url(options),
    method: 'put',
})

updateUser.definition = {
    methods: ["put"],
    url: '/api/auth/user',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\AuthController::updateUser
* @see app/Http/Controllers/Api/AuthController.php:88
* @route '/api/auth/user'
*/
updateUser.url = (options?: RouteQueryOptions) => {
    return updateUser.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AuthController::updateUser
* @see app/Http/Controllers/Api/AuthController.php:88
* @route '/api/auth/user'
*/
updateUser.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUser.url(options),
    method: 'put',
})

const AuthController = { register, login, getUserById, logout, user, updateUser }

export default AuthController