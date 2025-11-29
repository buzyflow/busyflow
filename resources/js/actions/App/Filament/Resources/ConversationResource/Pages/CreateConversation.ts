import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\ConversationResource\Pages\CreateConversation::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/CreateConversation.php:7
* @route '/admin/conversations/create'
*/
const CreateConversation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateConversation.url(options),
    method: 'get',
})

CreateConversation.definition = {
    methods: ["get","head"],
    url: '/admin/conversations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\ConversationResource\Pages\CreateConversation::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/CreateConversation.php:7
* @route '/admin/conversations/create'
*/
CreateConversation.url = (options?: RouteQueryOptions) => {
    return CreateConversation.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\ConversationResource\Pages\CreateConversation::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/CreateConversation.php:7
* @route '/admin/conversations/create'
*/
CreateConversation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateConversation.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\ConversationResource\Pages\CreateConversation::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/CreateConversation.php:7
* @route '/admin/conversations/create'
*/
CreateConversation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateConversation.url(options),
    method: 'head',
})

export default CreateConversation