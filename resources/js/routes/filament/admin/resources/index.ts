import bots from './bots'
import businesses from './businesses'
import conversations from './conversations'
import customers from './customers'
import orders from './orders'
import pricingPlans from './pricing-plans'
import products from './products'
import subscriptions from './subscriptions'
import users from './users'

const resources = {
    bots: Object.assign(bots, bots),
    businesses: Object.assign(businesses, businesses),
    conversations: Object.assign(conversations, conversations),
    customers: Object.assign(customers, customers),
    orders: Object.assign(orders, orders),
    pricingPlans: Object.assign(pricingPlans, pricingPlans),
    products: Object.assign(products, products),
    subscriptions: Object.assign(subscriptions, subscriptions),
    users: Object.assign(users, users),
}

export default resources