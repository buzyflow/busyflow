import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\SubscriptionResource\Pages\CreateSubscription::__invoke
* @see app/Filament/Resources/SubscriptionResource/Pages/CreateSubscription.php:7
* @route '/admin/subscriptions/create'
*/
const CreateSubscription = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateSubscription.url(options),
    method: 'get',
})

CreateSubscription.definition = {
    methods: ["get","head"],
    url: '/admin/subscriptions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\SubscriptionResource\Pages\CreateSubscription::__invoke
* @see app/Filament/Resources/SubscriptionResource/Pages/CreateSubscription.php:7
* @route '/admin/subscriptions/create'
*/
CreateSubscription.url = (options?: RouteQueryOptions) => {
    return CreateSubscription.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\SubscriptionResource\Pages\CreateSubscription::__invoke
* @see app/Filament/Resources/SubscriptionResource/Pages/CreateSubscription.php:7
* @route '/admin/subscriptions/create'
*/
CreateSubscription.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateSubscription.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\SubscriptionResource\Pages\CreateSubscription::__invoke
* @see app/Filament/Resources/SubscriptionResource/Pages/CreateSubscription.php:7
* @route '/admin/subscriptions/create'
*/
CreateSubscription.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateSubscription.url(options),
    method: 'head',
})

export default CreateSubscription