import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\ConversationResource\Pages\ListConversations::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/ListConversations.php:7
* @route '/admin/conversations'
*/
const ListConversations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListConversations.url(options),
    method: 'get',
})

ListConversations.definition = {
    methods: ["get","head"],
    url: '/admin/conversations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\ConversationResource\Pages\ListConversations::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/ListConversations.php:7
* @route '/admin/conversations'
*/
ListConversations.url = (options?: RouteQueryOptions) => {
    return ListConversations.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\ConversationResource\Pages\ListConversations::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/ListConversations.php:7
* @route '/admin/conversations'
*/
ListConversations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListConversations.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\ConversationResource\Pages\ListConversations::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/ListConversations.php:7
* @route '/admin/conversations'
*/
ListConversations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListConversations.url(options),
    method: 'head',
})

export default ListConversations