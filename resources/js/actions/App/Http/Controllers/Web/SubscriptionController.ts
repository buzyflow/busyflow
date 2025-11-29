import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\SubscriptionController::index
* @see app/Http/Controllers/Web/SubscriptionController.php:45
* @route '/subscription'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/subscription',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\SubscriptionController::index
* @see app/Http/Controllers/Web/SubscriptionController.php:45
* @route '/subscription'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\SubscriptionController::index
* @see app/Http/Controllers/Web/SubscriptionController.php:45
* @route '/subscription'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\SubscriptionController::index
* @see app/Http/Controllers/Web/SubscriptionController.php:45
* @route '/subscription'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\SubscriptionController::plans
* @see app/Http/Controllers/Web/SubscriptionController.php:18
* @route '/subscription/plans'
*/
export const plans = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: plans.url(options),
    method: 'get',
})

plans.definition = {
    methods: ["get","head"],
    url: '/subscription/plans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\SubscriptionController::plans
* @see app/Http/Controllers/Web/SubscriptionController.php:18
* @route '/subscription/plans'
*/
plans.url = (options?: RouteQueryOptions) => {
    return plans.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\SubscriptionController::plans
* @see app/Http/Controllers/Web/SubscriptionController.php:18
* @route '/subscription/plans'
*/
plans.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: plans.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\SubscriptionController::plans
* @see app/Http/Controllers/Web/SubscriptionController.php:18
* @route '/subscription/plans'
*/
plans.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: plans.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\SubscriptionController::create
* @see app/Http/Controllers/Web/SubscriptionController.php:67
* @route '/subscription/subscribe/{plan}'
*/
export const create = (args: { plan: string | number | { id: string | number } } | [plan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/subscription/subscribe/{plan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\SubscriptionController::create
* @see app/Http/Controllers/Web/SubscriptionController.php:67
* @route '/subscription/subscribe/{plan}'
*/
create.url = (args: { plan: string | number | { id: string | number } } | [plan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plan: typeof args.plan === 'object'
        ? args.plan.id
        : args.plan,
    }

    return create.definition.url
            .replace('{plan}', parsedArgs.plan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\SubscriptionController::create
* @see app/Http/Controllers/Web/SubscriptionController.php:67
* @route '/subscription/subscribe/{plan}'
*/
create.get = (args: { plan: string | number | { id: string | number } } | [plan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\SubscriptionController::create
* @see app/Http/Controllers/Web/SubscriptionController.php:67
* @route '/subscription/subscribe/{plan}'
*/
create.head = (args: { plan: string | number | { id: string | number } } | [plan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\SubscriptionController::callback
* @see app/Http/Controllers/Web/SubscriptionController.php:101
* @route '/subscription/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/subscription/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\SubscriptionController::callback
* @see app/Http/Controllers/Web/SubscriptionController.php:101
* @route '/subscription/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\SubscriptionController::callback
* @see app/Http/Controllers/Web/SubscriptionController.php:101
* @route '/subscription/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\SubscriptionController::callback
* @see app/Http/Controllers/Web/SubscriptionController.php:101
* @route '/subscription/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\SubscriptionController::cancel
* @see app/Http/Controllers/Web/SubscriptionController.php:124
* @route '/subscription/cancel'
*/
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/subscription/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\SubscriptionController::cancel
* @see app/Http/Controllers/Web/SubscriptionController.php:124
* @route '/subscription/cancel'
*/
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\SubscriptionController::cancel
* @see app/Http/Controllers/Web/SubscriptionController.php:124
* @route '/subscription/cancel'
*/
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Web\SubscriptionController::resume
* @see app/Http/Controllers/Web/SubscriptionController.php:140
* @route '/subscription/resume'
*/
export const resume = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resume.url(options),
    method: 'post',
})

resume.definition = {
    methods: ["post"],
    url: '/subscription/resume',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\SubscriptionController::resume
* @see app/Http/Controllers/Web/SubscriptionController.php:140
* @route '/subscription/resume'
*/
resume.url = (options?: RouteQueryOptions) => {
    return resume.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\SubscriptionController::resume
* @see app/Http/Controllers/Web/SubscriptionController.php:140
* @route '/subscription/resume'
*/
resume.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resume.url(options),
    method: 'post',
})

const SubscriptionController = { index, plans, create, callback, cancel, resume }

export default SubscriptionController