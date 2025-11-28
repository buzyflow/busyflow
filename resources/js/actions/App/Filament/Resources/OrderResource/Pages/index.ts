import ListOrders from './ListOrders'
import CreateOrder from './CreateOrder'
import EditOrder from './EditOrder'

const Pages = {
    ListOrders: Object.assign(ListOrders, ListOrders),
    CreateOrder: Object.assign(CreateOrder, CreateOrder),
    EditOrder: Object.assign(EditOrder, EditOrder),
}

export default Pages