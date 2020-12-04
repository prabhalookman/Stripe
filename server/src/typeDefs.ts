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

input CustomerInput {
    email: String,
    name: String,
    description: String
}

type Query {
    hello: String!,
    me: User,
    customerList:[Customer]
}

type Mutation {
    register(email: String!, password: String!): Boolean!
    login(email:String!, password: String!): User
    createSubscription(source: String!, ccLast4: String): User
    changeCreditCard(source: String!, ccLast4: String): User
    cancelSubscription: User,
    createProduct(email:String):String,
    createCustomer(email:String, name: String, description: String): Customer
    
}`
//createSubscription all i really need to take is that token ID or what stripe calls it is the "source"