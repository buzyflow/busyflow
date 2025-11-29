import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\ConversationResource\Pages\EditConversation::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/EditConversation.php:7
* @route '/admin/conversations/{record}/edit'
*/
const EditConversation = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditConversation.url(args, options),
    method: 'get',
})

EditConversation.definition = {
    methods: ["get","head"],
    url: '/admin/conversations/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\ConversationResource\Pages\EditConversation::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/EditConversation.php:7
* @route '/admin/conversations/{record}/edit'
*/
EditConversation.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditConversation.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\ConversationResource\Pages\EditConversation::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/EditConversation.php:7
* @route '/admin/conversations/{record}/edit'
*/
EditConversation.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditConversation.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\ConversationResource\Pages\EditConversation::__invoke
* @see app/Filament/Resources/ConversationResource/Pages/EditConversation.php:7
* @route '/admin/conversations/{record}/edit'
*/
EditConversation.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditConversation.url(args, options),
    method: 'head',
})

export default EditConversation