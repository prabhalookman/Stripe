import { IResolvers } from "graphql-tools";
import * as bcrypt from 'bcryptjs';
import { MyUser } from "./entity/MyUser";
import { stripe } from "./stripe";

export const resolvers: IResolvers = {
    Query: {
        hello: () => {
            return 'Hi'
        },
        me: (_, __, { req }) => {

            if (!req.session.userId) {
                return null;
            }
            return MyUser.findOne(req.session.userId)
        }

    },
    Mutation: {
        register: async (_, { email, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await MyUser.create({
                email,
                password: hashedPassword
            }).save();
            console.log('Success : ', result)

            return true;
        },
        login: async (_, { email, password }, { req }) => {
            const user = await MyUser.findOne({ where: { email } })
            if (!user) {
                return null;
            }

            const valid = await bcrypt.compare(password, user.password)

            if (!valid) {
                return null;
            }

            //How i'm gonna know that the user is who they are ? is we're gonna store a cookie on them and in our server we're gonna store the user ID on our server.
            req.session.userId = user.id;

            //When i set the user ID right here a request session or express-session knows to add a cookie to the user. 
            //So now a cookie gonna get sent whenever we do login .
            console.log("user Info : ", user);

            return user;
        }, createSubscription: async (_, { source }, { req }) => {
            //source : Token
            if (!req.session || !req.session.userId) {
                throw new Error("not authenticated");
            }

            const user = await MyUser.findOne(req.session.userId);

            if (!user) {
                throw new Error()
            }

            let stripeId = user.stipeId;

            if (!stripeId) {
                const customer = await stripe.customers.create({
                    email: user.email,
                    source,
                    plan: process.env.PLAN
                });
                stripeId = customer.id;
            } else {
                // update customer
                await stripe.customers.update(stripeId, { source });
                //await stripe.subscriptions.create({customer: stripeId,items: [{plan: process.env.PLAN!}]});
            }

            user.stipeId = stripeId;
            user.type = "paid";

            await user.save();
            return user;
        }
    }
}

/* 
1. To subscription , we should have the plan 
2. To create plan , go to stipe Dashboard - Billing - Subscriptions (where we can see users that are subscribed )

3. For Subscription we are going to create a product 

*/
