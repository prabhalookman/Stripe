import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type User {
    id: ID!
    email: String!,
    type: String,
    ccLast4: String
}

type Customer{
    id:String,
    email: String,
    currency: String,
    invoice_prefix: String,
    name: String,    
    description: String
}

type Product {
    id:String,
    name: String,
    description: String
}

type Subscription {
    id: String,
    cardId: String,
    brand: String,
    last4: String,
    email: String
}

type Price {
    id: String,
    currency: String,
    product: String,
    recurring: Recurring
 }

 type Recurring {
    interval: String,
	interval_count: Int
 }

input CustomerInput {
    email: String,
    name: String,
    description: String
}

input ProductInput {
    name: String,
    description: String
}

input PriceInput {
    currency: String,
    product: String,
    recurring: RecurringInput
}

input RecurringInput {
    interval: String,
	interval_count: Int
}

type Query {
    hello: String!,
    me: User,
    customerList:[Customer]
    productList: [Product]
    subscriptionsList: [Product]
    priceList: [Price]    
}

type Mutation {
    register(email: String!, password: String!): Boolean!
    login(email:String!, password: String!): User
    createSubscription(source: String!, ccLast4: String): User
    changeCreditCard(source: String!, ccLast4: String): User
    cancelSubscription: User,
    createProduct(product: ProductInput):Product,
    createCustomer(email:String, name: String, description: String): Customer
    
}`
//createSubscription all i really need to take is that token ID or what stripe calls it is the "source"
//