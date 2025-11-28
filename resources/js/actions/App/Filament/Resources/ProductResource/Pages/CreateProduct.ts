import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\ProductResource\Pages\CreateProduct::__invoke
* @see app/Filament/Resources/ProductResource/Pages/CreateProduct.php:7
* @route '/admin/products/create'
*/
const CreateProduct = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateProduct.url(options),
    method: 'get',
})

CreateProduct.definition = {
    methods: ["get","head"],
    url: '/admin/products/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\ProductResource\Pages\CreateProduct::__invoke
* @see app/Filament/Resources/ProductResource/Pages/CreateProduct.php:7
* @route '/admin/products/create'
*/
CreateProduct.url = (options?: RouteQueryOptions) => {
    return CreateProduct.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\ProductResource\Pages\CreateProduct::__invoke
* @see app/Filament/Resources/ProductResource/Pages/CreateProduct.php:7
* @route '/admin/products/create'
*/
CreateProduct.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateProduct.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\ProductResource\Pages\CreateProduct::__invoke
* @see app/Filament/Resources/ProductResource/Pages/CreateProduct.php:7
* @route '/admin/products/create'
*/
CreateProduct.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateProduct.url(options),
    method: 'head',
})

export default CreateProduct