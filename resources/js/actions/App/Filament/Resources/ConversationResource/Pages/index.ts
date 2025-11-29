import ListConversations from './ListConversations'
import CreateConversation from './CreateConversation'
import EditConversation from './EditConversation'

const Pages = {
    ListConversations: Object.assign(ListConversations, ListConversations),
    CreateConversation: Object.assign(CreateConversation, CreateConversation),
    EditConversation: Object.assign(EditConversation, EditConversation),
}

export default Pages