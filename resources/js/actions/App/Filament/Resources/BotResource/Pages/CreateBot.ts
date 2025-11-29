import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\BotResource\Pages\CreateBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/CreateBot.php:7
* @route '/admin/bots/create'
*/
const CreateBot = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateBot.url(options),
    method: 'get',
})

CreateBot.definition = {
    methods: ["get","head"],
    url: '/admin/bots/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\BotResource\Pages\CreateBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/CreateBot.php:7
* @route '/admin/bots/create'
*/
CreateBot.url = (options?: RouteQueryOptions) => {
    return CreateBot.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\BotResource\Pages\CreateBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/CreateBot.php:7
* @route '/admin/bots/create'
*/
CreateBot.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateBot.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\BotResource\Pages\CreateBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/CreateBot.php:7
* @route '/admin/bots/create'
*/
CreateBot.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateBot.url(options),
    method: 'head',
})

export default CreateBot