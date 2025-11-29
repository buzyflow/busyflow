import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\BusinessResource\Pages\ListBusinesses::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/ListBusinesses.php:7
* @route '/admin/businesses'
*/
const ListBusinesses = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListBusinesses.url(options),
    method: 'get',
})

ListBusinesses.definition = {
    methods: ["get","head"],
    url: '/admin/businesses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\BusinessResource\Pages\ListBusinesses::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/ListBusinesses.php:7
* @route '/admin/businesses'
*/
ListBusinesses.url = (options?: RouteQueryOptions) => {
    return ListBusinesses.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\BusinessResource\Pages\ListBusinesses::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/ListBusinesses.php:7
* @route '/admin/businesses'
*/
ListBusinesses.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListBusinesses.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\BusinessResource\Pages\ListBusinesses::__invoke
* @see app/Filament/Resources/BusinessResource/Pages/ListBusinesses.php:7
* @route '/admin/businesses'
*/
ListBusinesses.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListBusinesses.url(options),
    method: 'head',
})

export default ListBusinesses