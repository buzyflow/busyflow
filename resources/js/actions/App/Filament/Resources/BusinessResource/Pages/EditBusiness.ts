import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\BusinessResource\Pages\EditBusiness::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/EditBusiness.php:7
* @route '/admin/businesses/{record}/edit'
*/
const EditBusiness = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditBusiness.url(args, options),
    method: 'get',
})

EditBusiness.definition = {
    methods: ["get","head"],
    url: '/admin/businesses/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\BusinessResource\Pages\EditBusiness::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/EditBusiness.php:7
* @route '/admin/businesses/{record}/edit'
*/
EditBusiness.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditBusiness.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\BusinessResource\Pages\EditBusiness::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/EditBusiness.php:7
* @route '/admin/businesses/{record}/edit'
*/
EditBusiness.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditBusiness.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\BusinessResource\Pages\EditBusiness::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/EditBusiness.php:7
* @route '/admin/businesses/{record}/edit'
*/
EditBusiness.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditBusiness.url(args, options),
    method: 'head',
})

export default EditBusiness