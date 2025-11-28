import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\ChatController::index
* @see app/Http/Controllers/Web/ChatController.php:35
* @route '/{business}/chat'
*/
export const index = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{business}/chat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\ChatController::index
* @see app/Http/Controllers/Web/ChatController.php:35
* @route '/{business}/chat'
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
* @see \App\Http\Controllers\Web\ChatController::index
* @see app/Http/Controllers/Web/ChatController.php:35
* @route '/{business}/chat'
*/
index.get = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\ChatController::index
* @see app/Http/Controllers/Web/ChatController.php:35
* @route '/{business}/chat'
*/
index.head = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\ChatController::start
* @see app/Http/Controllers/Web/ChatController.php:75
* @route '/{business}/chat/start'
*/
export const start = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

start.definition = {
    methods: ["post"],
    url: '/{business}/chat/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\ChatController::start
* @see app/Http/Controllers/Web/ChatController.php:75
* @route '/{business}/chat/start'
*/
start.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return start.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ChatController::start
* @see app/Http/Controllers/Web/ChatController.php:75
* @route '/{business}/chat/start'
*/
start.post = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Web\ChatController::send
* @see app/Http/Controllers/Web/ChatController.php:161
* @route '/{business}/chat/send'
*/
export const send = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(args, options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/{business}/chat/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\ChatController::send
* @see app/Http/Controllers/Web/ChatController.php:161
* @route '/{business}/chat/send'
*/
send.url = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return send.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ChatController::send
* @see app/Http/Controllers/Web/ChatController.php:161
* @route '/{business}/chat/send'
*/
send.post = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Web\ChatController::messages
* @see app/Http/Controllers/Web/ChatController.php:121
* @route '/{business}/chat/messages'
*/
export const messages = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: messages.url(args, options),
    method: 'post',
})

messages.definition = {
    methods: ["post"],
    url: '/{business}/chat/messages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\ChatController::messages
* @see app/Http/Controllers/Web/ChatController.php:121
* @route '/{business}/chat/messages'
*/
messages.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return messages.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ChatController::messages
* @see app/Http/Controllers/Web/ChatController.php:121
* @route '/{business}/chat/messages'
*/
messages.post = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: messages.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Web\ChatController::getCart
* @see app/Http/Controllers/Web/ChatController.php:255
* @route '/{business}/chat/cart'
*/
export const getCart = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCart.url(args, options),
    method: 'get',
})

getCart.definition = {
    methods: ["get","head"],
    url: '/{business}/chat/cart',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\ChatController::getCart
* @see app/Http/Controllers/Web/ChatController.php:255
* @route '/{business}/chat/cart'
*/
getCart.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return getCart.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ChatController::getCart
* @see app/Http/Controllers/Web/ChatController.php:255
* @route '/{business}/chat/cart'
*/
getCart.get = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCart.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\ChatController::getCart
* @see app/Http/Controllers/Web/ChatController.php:255
* @route '/{business}/chat/cart'
*/
getCart.head = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getCart.url(args, options),
    method: 'head',
})

const ChatController = { index, start, send, messages, getCart }

export default ChatController