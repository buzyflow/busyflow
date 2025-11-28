import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\ProductController::bulkStore
* @see app/Http/Controllers/Web/ProductController.php:75
* @route '/{business}/products/bulk'
*/
export const bulkStore = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkStore.url(args, options),
    method: 'post',
})

bulkStore.definition = {
    methods: ["post"],
    url: '/{business}/products/bulk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\ProductController::bulkStore
* @see app/Http/Controllers/Web/ProductController.php:75
* @route '/{business}/products/bulk'
*/
bulkStore.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return bulkStore.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ProductController::bulkStore
* @see app/Http/Controllers/Web/ProductController.php:75
* @route '/{business}/products/bulk'
*/
bulkStore.post = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkStore.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Web\ProductController::index
* @see app/Http/Controllers/Web/ProductController.php:15
* @route '/{business}/products'
*/
export const index = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{business}/products',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\ProductController::index
* @see app/Http/Controllers/Web/ProductController.php:15
* @route '/{business}/products'
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
* @see \App\Http\Controllers\Web\ProductController::index
* @see app/Http/Controllers/Web/ProductController.php:15
* @route '/{business}/products'
*/
index.get = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\ProductController::index
* @see app/Http/Controllers/Web/ProductController.php:15
* @route '/{business}/products'
*/
index.head = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\ProductController::create
* @see app/Http/Controllers/Web/ProductController.php:33
* @route '/{business}/products/create'
*/
export const create = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{business}/products/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\ProductController::create
* @see app/Http/Controllers/Web/ProductController.php:33
* @route '/{business}/products/create'
*/
create.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ProductController::create
* @see app/Http/Controllers/Web/ProductController.php:33
* @route '/{business}/products/create'
*/
create.get = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\ProductController::create
* @see app/Http/Controllers/Web/ProductController.php:33
* @route '/{business}/products/create'
*/
create.head = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\ProductController::store
* @see app/Http/Controllers/Web/ProductController.php:40
* @route '/{business}/products'
*/
export const store = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{business}/products',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\ProductController::store
* @see app/Http/Controllers/Web/ProductController.php:40
* @route '/{business}/products'
*/
store.url = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ProductController::store
* @see app/Http/Controllers/Web/ProductController.php:40
* @route '/{business}/products'
*/
store.post = (args: { business: string | { slug: string } } | [business: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Web\ProductController::show
* @see app/Http/Controllers/Web/ProductController.php:0
* @route '/{business}/products/{product}'
*/
export const show = (args: { business: string | number | { slug: string | number }, product: string | number } | [business: string | number | { slug: string | number }, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{business}/products/{product}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\ProductController::show
* @see app/Http/Controllers/Web/ProductController.php:0
* @route '/{business}/products/{product}'
*/
show.url = (args: { business: string | number | { slug: string | number }, product: string | number } | [business: string | number | { slug: string | number }, product: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            business: args[0],
            product: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        business: typeof args.business === 'object'
        ? args.business.slug
        : args.business,
        product: args.product,
    }

    return show.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ProductController::show
* @see app/Http/Controllers/Web/ProductController.php:0
* @route '/{business}/products/{product}'
*/
show.get = (args: { business: string | number | { slug: string | number }, product: string | number } | [business: string | number | { slug: string | number }, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\ProductController::show
* @see app/Http/Controllers/Web/ProductController.php:0
* @route '/{business}/products/{product}'
*/
show.head = (args: { business: string | number | { slug: string | number }, product: string | number } | [business: string | number | { slug: string | number }, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\ProductController::edit
* @see app/Http/Controllers/Web/ProductController.php:113
* @route '/{business}/products/{product}/edit'
*/
export const edit = (args: { business: string | { slug: string }, product: number | { id: number } } | [business: string | { slug: string }, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{business}/products/{product}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\ProductController::edit
* @see app/Http/Controllers/Web/ProductController.php:113
* @route '/{business}/products/{product}/edit'
*/
edit.url = (args: { business: string | { slug: string }, product: number | { id: number } } | [business: string | { slug: string }, product: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            business: args[0],
            product: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        business: typeof args.business === 'object'
        ? args.business.slug
        : args.business,
        product: typeof args.product === 'object'
        ? args.product.id
        : args.product,
    }

    return edit.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ProductController::edit
* @see app/Http/Controllers/Web/ProductController.php:113
* @route '/{business}/products/{product}/edit'
*/
edit.get = (args: { business: string | { slug: string }, product: number | { id: number } } | [business: string | { slug: string }, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\ProductController::edit
* @see app/Http/Controllers/Web/ProductController.php:113
* @route '/{business}/products/{product}/edit'
*/
edit.head = (args: { business: string | { slug: string }, product: number | { id: number } } | [business: string | { slug: string }, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\ProductController::update
* @see app/Http/Controllers/Web/ProductController.php:128
* @route '/{business}/products/{product}'
*/
export const update = (args: { business: string | { slug: string }, product: number | { id: number } } | [business: string | { slug: string }, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/{business}/products/{product}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Web\ProductController::update
* @see app/Http/Controllers/Web/ProductController.php:128
* @route '/{business}/products/{product}'
*/
update.url = (args: { business: string | { slug: string }, product: number | { id: number } } | [business: string | { slug: string }, product: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            business: args[0],
            product: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        business: typeof args.business === 'object'
        ? args.business.slug
        : args.business,
        product: typeof args.product === 'object'
        ? args.product.id
        : args.product,
    }

    return update.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ProductController::update
* @see app/Http/Controllers/Web/ProductController.php:128
* @route '/{business}/products/{product}'
*/
update.put = (args: { business: string | { slug: string }, product: number | { id: number } } | [business: string | { slug: string }, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Web\ProductController::update
* @see app/Http/Controllers/Web/ProductController.php:128
* @route '/{business}/products/{product}'
*/
update.patch = (args: { business: string | { slug: string }, product: number | { id: number } } | [business: string | { slug: string }, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Web\ProductController::destroy
* @see app/Http/Controllers/Web/ProductController.php:160
* @route '/{business}/products/{product}'
*/
export const destroy = (args: { business: string | { slug: string }, product: number | { id: number } } | [business: string | { slug: string }, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{business}/products/{product}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\ProductController::destroy
* @see app/Http/Controllers/Web/ProductController.php:160
* @route '/{business}/products/{product}'
*/
destroy.url = (args: { business: string | { slug: string }, product: number | { id: number } } | [business: string | { slug: string }, product: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            business: args[0],
            product: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        business: typeof args.business === 'object'
        ? args.business.slug
        : args.business,
        product: typeof args.product === 'object'
        ? args.product.id
        : args.product,
    }

    return destroy.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ProductController::destroy
* @see app/Http/Controllers/Web/ProductController.php:160
* @route '/{business}/products/{product}'
*/
destroy.delete = (args: { business: string | { slug: string }, product: number | { id: number } } | [business: string | { slug: string }, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ProductController = { bulkStore, index, create, store, show, edit, update, destroy }

export default ProductController