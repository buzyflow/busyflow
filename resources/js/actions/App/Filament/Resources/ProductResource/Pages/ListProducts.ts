import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\ProductResource\Pages\ListProducts::__invoke
* @see app/Filament/Resources/ProductResource/Pages/ListProducts.php:7
* @route '/admin/products'
*/
const ListProducts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListProducts.url(options),
    method: 'get',
})

ListProducts.definition = {
    methods: ["get","head"],
    url: '/admin/products',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\ProductResource\Pages\ListProducts::__invoke
* @see app/Filament/Resources/ProductResource/Pages/ListProducts.php:7
* @route '/admin/products'
*/
ListProducts.url = (options?: RouteQueryOptions) => {
    return ListProducts.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\ProductResource\Pages\ListProducts::__invoke
* @see app/Filament/Resources/ProductResource/Pages/ListProducts.php:7
* @route '/admin/products'
*/
ListProducts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListProducts.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\ProductResource\Pages\ListProducts::__invoke
* @see app/Filament/Resources/ProductResource/Pages/ListProducts.php:7
* @route '/admin/products'
*/
ListProducts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListProducts.url(options),
    method: 'head',
})

export default ListProducts