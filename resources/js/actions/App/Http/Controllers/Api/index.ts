import AuthController from './AuthController'
import PricingPlanController from './PricingPlanController'
import PaystackWebhookController from './PaystackWebhookController'
import ChatController from './ChatController'
import ProductController from './ProductController'
import CustomerController from './CustomerController'
import OrderController from './OrderController'
import ProductExtractionController from './ProductExtractionController'

const Api = {
    AuthController: Object.assign(AuthController, AuthController),
    PricingPlanController: Object.assign(PricingPlanController, PricingPlanController),
    PaystackWebhookController: Object.assign(PaystackWebhookController, PaystackWebhookController),
    ChatController: Object.assign(ChatController, ChatController),
    ProductController: Object.assign(ProductController, ProductController),
    CustomerController: Object.assign(CustomerController, CustomerController),
    OrderController: Object.assign(OrderController, OrderController),
    ProductExtractionController: Object.assign(ProductExtractionController, ProductExtractionController),
}

export default Api