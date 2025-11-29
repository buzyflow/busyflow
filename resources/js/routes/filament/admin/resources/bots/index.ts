import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Filament\Resources\BotResource\Pages\ListBots::__invoke
* @see app/Filament/Resources/BotResource/Pages/ListBots.php:7
* @route '/admin/bots'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/bots',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\BotResource\Pages\ListBots::__invoke
* @see app/Filament/Resources/BotResource/Pages/ListBots.php:7
* @route '/admin/bots'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\BotResource\Pages\ListBots::__invoke
* @see app/Filament/Resources/BotResource/Pages/ListBots.php:7
* @route '/admin/bots'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\BotResource\Pages\ListBots::__invoke
* @see app/Filament/Resources/BotResource/Pages/ListBots.php:7
* @route '/admin/bots'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\BotResource\Pages\CreateBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/CreateBot.php:7
* @route '/admin/bots/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/bots/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\BotResource\Pages\CreateBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/CreateBot.php:7
* @route '/admin/bots/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\BotResource\Pages\CreateBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/CreateBot.php:7
* @route '/admin/bots/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\BotResource\Pages\CreateBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/CreateBot.php:7
* @route '/admin/bots/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\BotResource\Pages\EditBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/EditBot.php:7
* @route '/admin/bots/{record}/edit'
*/
export const edit = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/bots/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\BotResource\Pages\EditBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/EditBot.php:7
* @route '/admin/bots/{record}/edit'
*/
edit.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\BotResource\Pages\EditBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/EditBot.php:7
* @route '/admin/bots/{record}/edit'
*/
edit.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\BotResource\Pages\EditBot::__invoke
* @see app/Filament/Resources/BotResource/Pages/EditBot.php:7
* @route '/admin/bots/{record}/edit'
*/
edit.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

const bots = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    edit: Object.assign(edit, edit),
}

export default bots