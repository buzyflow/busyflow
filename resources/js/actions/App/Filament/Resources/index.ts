import CustomerResource from './CustomerResource'
import OrderResource from './OrderResource'
import PricingPlanResource from './PricingPlanResource'
import ProductResource from './ProductResource'
import UserResource from './UserResource'

const Resources = {
    CustomerResource: Object.assign(CustomerResource, CustomerResource),
    OrderResource: Object.assign(OrderResource, OrderResource),
    PricingPlanResource: Object.assign(PricingPlanResource, PricingPlanResource),
    ProductResource: Object.assign(ProductResource, ProductResource),
    UserResource: Object.assign(UserResource, UserResource),
}

export default Resources