import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ProductExtractionController::extract
* @see app/Http/Controllers/Api/ProductExtractionController.php:17
* @route '/{business}/products/extract'
*/
export const extract = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: extract.url(args, options),
    method: 'post',
})

extract.definition = {
    methods: ["post"],
    url: '/{business}/products/extract',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ProductExtractionController::extract
* @see app/Http/Controllers/Api/ProductExtractionController.php:17
* @route '/{business}/products/extract'
*/
extract.url = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return extract.definition.url
            .replace('{business}', parsedArgs.business.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProductExtractionController::extract
* @see app/Http/Controllers/Api/ProductExtractionController.php:17
* @route '/{business}/products/extract'
*/
extract.post = (args: { business: string | number | { slug: string | number } } | [business: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: extract.url(args, options),
    method: 'post',
})

const ProductExtractionController = { extract }

export default ProductExtractionController