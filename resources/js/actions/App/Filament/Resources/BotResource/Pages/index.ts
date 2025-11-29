import ListBots from './ListBots'
import CreateBot from './CreateBot'
import EditBot from './EditBot'

const Pages = {
    ListBots: Object.assign(ListBots, ListBots),
    CreateBot: Object.assign(CreateBot, CreateBot),
    EditBot: Object.assign(EditBot, EditBot),
}

export default Pages