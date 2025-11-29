import AuthController from './AuthController'
import BusinessSetupController from './BusinessSetupController'
import SubscriptionController from './SubscriptionController'
import DashboardController from './DashboardController'
import ProductController from './ProductController'
import OrderController from './OrderController'
import SettingsController from './SettingsController'
import ChatController from './ChatController'

const Web = {
    AuthController: Object.assign(AuthController, AuthController),
    BusinessSetupController: Object.assign(BusinessSetupController, BusinessSetupController),
    SubscriptionController: Object.assign(SubscriptionController, SubscriptionController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    ProductController: Object.assign(ProductController, ProductController),
    OrderController: Object.assign(OrderController, OrderController),
    SettingsController: Object.assign(SettingsController, SettingsController),
    ChatController: Object.assign(ChatController, ChatController),
}

export default Web