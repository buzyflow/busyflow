import customers from './customers'
import orders from './orders'
import pricingPlans from './pricing-plans'
import products from './products'
import users from './users'

const resources = {
    customers: Object.assign(customers, customers),
    orders: Object.assign(orders, orders),
    pricingPlans: Object.assign(pricingPlans, pricingPlans),
    products: Object.assign(products, products),
    users: Object.assign(users, users),
}

export default resources