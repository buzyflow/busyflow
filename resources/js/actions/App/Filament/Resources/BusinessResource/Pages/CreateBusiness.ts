import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\BusinessResource\Pages\CreateBusiness::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/CreateBusiness.php:7
* @route '/admin/businesses/create'
*/
const CreateBusiness = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateBusiness.url(options),
    method: 'get',
})

CreateBusiness.definition = {
    methods: ["get","head"],
    url: '/admin/businesses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\BusinessResource\Pages\CreateBusiness::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/CreateBusiness.php:7
* @route '/admin/businesses/create'
*/
CreateBusiness.url = (options?: RouteQueryOptions) => {
    return CreateBusiness.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\BusinessResource\Pages\CreateBusiness::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/CreateBusiness.php:7
* @route '/admin/businesses/create'
*/
CreateBusiness.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateBusiness.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\BusinessResource\Pages\CreateBusiness::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/CreateBusiness.php:7
* @route '/admin/businesses/create'
*/
CreateBusiness.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateBusiness.url(options),
    method: 'head',
})

export default CreateBusiness