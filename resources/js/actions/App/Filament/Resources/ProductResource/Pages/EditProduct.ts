import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\ProductResource\Pages\EditProduct::__invoke
* @see app/Filament/Resources/ProductResource/Pages/EditProduct.php:7
* @route '/admin/products/{record}/edit'
*/
const EditProduct = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditProduct.url(args, options),
    method: 'get',
})

EditProduct.definition = {
    methods: ["get","head"],
    url: '/admin/products/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\ProductResource\Pages\EditProduct::__invoke
* @see app/Filament/Resources/ProductResource/Pages/EditProduct.php:7
* @route '/admin/products/{record}/edit'
*/
EditProduct.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    if (Array.isArray(args)) {
        args = {
            record: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        record: args.record,
    }

    return EditProduct.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\ProductResource\Pages\EditProduct::__invoke
* @see app/Filament/Resources/ProductResource/Pages/EditProduct.php:7
* @route '/admin/products/{record}/edit'
*/
EditProduct.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditProduct.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\ProductResource\Pages\EditProduct::__invoke
* @see app/Filament/Resources/ProductResource/Pages/EditProduct.php:7
* @route '/admin/products/{record}/edit'
*/
EditProduct.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditProduct.url(args, options),
    method: 'head',
})

export default EditProduct