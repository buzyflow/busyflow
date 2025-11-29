import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\BotResource\Pages\ListBots::__invoke
* @see app/Filament/Resources/BotResource/Pages/ListBots.php:7
* @route '/admin/bots'
*/
const ListBots = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListBots.url(options),
    method: 'get',
})

ListBots.definition = {
    methods: ["get","head"],
    url: '/admin/bots',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\BotResource\Pages\ListBots::__invoke
* @see app/Filament/Resources/BotResource/Pages/ListBots.php:7
* @route '/admin/bots'
*/
ListBots.url = (options?: RouteQueryOptions) => {
    return ListBots.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\BotResource\Pages\ListBots::__invoke
* @see app/Filament/Resources/BotResource/Pages/ListBots.php:7
* @route '/admin/bots'
*/
ListBots.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListBots.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\BotResource\Pages\ListBots::__invoke
* @see app/Filament/Resources/BotResource/Pages/ListBots.php:7
* @route '/admin/bots'
*/
ListBots.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListBots.url(options),
    method: 'head',
})

export default ListBots