import AuthController from './AuthController'
import BusinessSetupController from './BusinessSetupController'
import DashboardController from './DashboardController'
import ProductController from './ProductController'
import ChatController from './ChatController'

const Web = {
    AuthController: Object.assign(AuthController, AuthController),
    BusinessSetupController: Object.assign(BusinessSetupController, BusinessSetupController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    ProductController: Object.assign(ProductController, ProductController),
    ChatController: Object.assign(ChatController, ChatController),
}

export default Web