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
        }, createSubscription: async (_, { source, ccLast4 }, { req }) => {
            if (!req.session || !req.session.userId) {
              throw new Error("not authenticated");
            }
      
            const user = await MyUser.findOne(req.session.userId);
      
            if (!user) {
              throw new Error();
            }
      
            let stripeId = user.stripeId;
      
            if (!stripeId) {
              const customer = await stripe.customers.create({
                email: user.email,
                source,
                plan: process.env.PLAN
              });
              stripeId = customer.id;
            } else {
              // update customer
              const cust = await stripe.customers.update(stripeId, { source });
              console.log('cust : ', cust)
              const subs = await stripe.subscriptions.create({ 
                  customer: stripeId,
                  items: [ 
                      { plan: process.env.PLAN! } 
                    ] 
                });
                console.log('subs : ', subs)
            }            
      
            user.stripeId = stripeId;
            user.type = "paid";
            user.ccLast4 = ccLast4;
            await user.save();
      
            return user;
          }, changeCreditCard: async (_, { source, ccLast4 }, { req }) => {
            //source : Token
            if (!req.session || !req.session.userId) {
                throw new Error("not authenticated");
            }

            const user = await MyUser.findOne(req.session.userId);

            if (!user || !user.stripeId || user.type !== "paid") {
                throw new Error();
              }
            
            await stripe.customers.update(user.stripeId, { source });

            user.ccLast4 = ccLast4;
            await user.save();

            return user;

        },cancelSubscription: async (_, __, { req }) => {
            console.log("From Cancel  ");
            if (!req.session || !req.session.userId) {
                throw new Error("not authenticated");
            }

            const user = await MyUser.findOne(req.session.userId);

            if (!user || !user.stripeId || user.type !== "paid") {
                throw new Error();
            }

            const stripeCustomer = await stripe.customers.retrieve(user.stripeId);
            console.log("Cancel : stripeCustomer - ", stripeCustomer)

            const subscriptions = await stripe.subscriptions.list({ limit: 3 });

              console.log("subscriptions List : ", subscriptions)
            
            const [subscription] = subscriptions.data;
            await stripe.subscriptions.del(subscription.id);

            const result = await stripe.customers.deleteCard(
                user.stripeId,
                stripeCustomer.default_source as string
            );

            console.log("result : ", result)

            user.type = "free-trail";
            await user.save();

            return user;
        },createProduct: async(_, {email}, {req}) => {

            console.log("Create Product");
            if (!req.session || !req.session.userId) {
                throw new Error("not authenticated");
            }

            console.log("req.session.userId : ", req.session.userId)

            const session1 = await stripe.checkout.sessions.retrieve('ram25@gmail.com');
            console.log('session1 : ', session1);
            
            const YOUR_DOMAIN = 'http://localhost:3000/';
            console.log(email)

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                  {
                    currency: 'usd',
                    name: 'Stubborn Attachments',
                    images: ['https://i.imgur.com/EHyR2nP.png'],
                    amount: 2000,
                    quantity: 1,
                  },
                ],
                mode: 'payment',
                success_url: `${YOUR_DOMAIN}?success=true`,
                cancel_url: `${YOUR_DOMAIN}?canceled=true`,
              });
              console.log ( " session.id : ", session.id);

              //res.json({ id: session.id });
              //https://dashboard.stripe.com/b/acct_1HewRQDHIfzRDTEX

            return session.id
        }
    
    }
}

/* 
1. To subscription , we should have the plan 
2. To create plan , go to stipe Dashboard - Billing - Subscriptions (where we can see users that are subscribed )

3. For Subscription we are going to create a product 

*/
