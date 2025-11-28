import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\OrderResource\Pages\CreateOrder::__invoke
* @see app/Filament/Resources/OrderResource/Pages/CreateOrder.php:7
* @route '/admin/orders/create'
*/
const CreateOrder = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateOrder.url(options),
    method: 'get',
})

CreateOrder.definition = {
    methods: ["get","head"],
    url: '/admin/orders/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\OrderResource\Pages\CreateOrder::__invoke
* @see app/Filament/Resources/OrderResource/Pages/CreateOrder.php:7
* @route '/admin/orders/create'
*/
CreateOrder.url = (options?: RouteQueryOptions) => {
    return CreateOrder.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\OrderResource\Pages\CreateOrder::__invoke
* @see app/Filament/Resources/OrderResource/Pages/CreateOrder.php:7
* @route '/admin/orders/create'
*/
CreateOrder.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateOrder.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\OrderResource\Pages\CreateOrder::__invoke
* @see app/Filament/Resources/OrderResource/Pages/CreateOrder.php:7
* @route '/admin/orders/create'
*/
CreateOrder.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateOrder.url(options),
    method: 'head',
})

export default CreateOrder