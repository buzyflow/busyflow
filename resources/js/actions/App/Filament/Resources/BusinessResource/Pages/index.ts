import ListBusinesses from './ListBusinesses'
import CreateBusiness from './CreateBusiness'
import EditBusiness from './EditBusiness'

const Pages = {
    ListBusinesses: Object.assign(ListBusinesses, ListBusinesses),
    CreateBusiness: Object.assign(CreateBusiness, CreateBusiness),
    EditBusiness: Object.assign(EditBusiness, EditBusiness),
}

export default Pages