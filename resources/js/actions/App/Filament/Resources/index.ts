import BotResource from './BotResource'
import BusinessResource from './BusinessResource'
import ConversationResource from './ConversationResource'
import CustomerResource from './CustomerResource'
import OrderResource from './OrderResource'
import PlanResource from './PlanResource'
import ProductResource from './ProductResource'
import SubscriptionResource from './SubscriptionResource'
import UserResource from './UserResource'

const Resources = {
    BotResource: Object.assign(BotResource, BotResource),
    BusinessResource: Object.assign(BusinessResource, BusinessResource),
    ConversationResource: Object.assign(ConversationResource, ConversationResource),
    CustomerResource: Object.assign(CustomerResource, CustomerResource),
    OrderResource: Object.assign(OrderResource, OrderResource),
    PlanResource: Object.assign(PlanResource, PlanResource),
    ProductResource: Object.assign(ProductResource, ProductResource),
    SubscriptionResource: Object.assign(SubscriptionResource, SubscriptionResource),
    UserResource: Object.assign(UserResource, UserResource),
}

export default Resources