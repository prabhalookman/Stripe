import { IResolvers } from "graphql-tools";
import * as bcrypt from 'bcryptjs';
import { MyUser } from "./entity/MyUser";
const stripe = require('stripe')(process.env.STRIPE_SCECRET);

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
    },
    customerList: async (_, __, { req }) => {

      if (!req.session || !req.session.userId) {
        throw new Error("not authenticated");
      }

      const customers = await stripe.customers.list({
        limit: 5,
      });

      let arryCust = customers.data.map((e:any) => { return { id: e.id, email: e.email, currency: e.currency, invoice_prefix: e.invoice_prefix } })

      return arryCust

    },
    productList: async (_, __, {req}) =>{
      if (!req.session || !req.session.userId) {
        throw new Error("not authenticated");
      }
      const products = await stripe.products.list({
        limit: 5,
      });

      let arrProducts = products.data.map((e:any) => { return { id: e.id, name: e.name, description: e.description } })
      //const product = await stripe.products.retrieve( 'prod_IRsdSTWQL1p30u');

      return arrProducts

    },
    subscriptionsList: async(_, __, {req}) => {

      if(!req.session || !req.session.userId){
        throw new Error("not authenticated");
      }

      const subscriptions = await stripe.subscriptions.list({
        limit: 3,
      });

      console.log('subscriptions : ', subscriptions);

      let arrsubscriptions = subscriptions.data.map((e:any) => { return { id: e.id } })

      // cardId: e.card.id, email: e.email

      return arrsubscriptions

    },    
    priceList: async(_, __, {req}) => {

      if(!req.session || !req.session.userId){
        throw new Error("not authenticated");
      }

      const prices = await stripe.prices.list({
        limit: 3,
      });

      console.log('prices : ', JSON.stringify(prices));
      let rec:any = {};

      let arrsubscriptions = prices.data.map((e:any) => {

        // if(e.recurring){
        //   rec["interval"] = e.recurring.day
        //   rec["interval_count"] = e.recurring.interval_count
        // }

        return {
          id: e.id,
          currency: e.currency,
          product:e.product,
          recurring: e.recurring? rec : null
        }
    })
    console.log('arrsubscriptions : ', arrsubscriptions);

    return arrsubscriptions

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
          price: process.env.PLAN
        });
        stripeId = customer.id;
      } else {
        // update customer
        const cust = await stripe.customers.update(stripeId, { source });
        console.log('cust : ', cust)
        const subs = await stripe.subscriptions.create({
          customer: stripeId,
          items: [
            { price: process.env.PLAN! }
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

    }, cancelSubscription: async (_, __, { req }) => {
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
    }, createProduct: async (_, { product }, { req }) => {

      console.log("Create Product ", product);
      try {
        if (!req.session || !req.session.userId) {
          throw new Error("not authenticated");
        }
        const result = await stripe.products.create({ type: 'good', name: product.name });

        console.log('Create Product Result : ', result)

        return {
          id: result.id,
          name: result.name,
          description: result.description
        }

      } catch (error) {
        console.log("Create Product error : ", error)
        throw new Error("Error");
      }

      // const session1 = await stripe.checkout.sessions.retrieve('ram25@gmail.com');
      // console.log('session1 : ', session1);

      // const YOUR_DOMAIN = 'http://localhost:3000/';
      // console.log(email)

      // const session = await stripe.checkout.sessions.create({
      //     payment_method_types: ['card'],
      //     line_items: [
      //       {
      //         currency: 'usd',
      //         name: 'Stubborn Attachments',
      //         images: ['https://i.imgur.com/EHyR2nP.png'],
      //         amount: 2000,
      //         quantity: 1,
      //       },
      //     ],
      //     mode: 'payment',
      //     success_url: `${YOUR_DOMAIN}?success=true`,
      //     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      //   });
      //   console.log ( " session.id : ", session.id);

      //res.json({ id: session.id });
      //https://dashboard.stripe.com/b/acct_1HewRQDHIfzRDTEX


    }, createCustomer: async (_, { email, name, description }, { req }) => {

      if (!req.session || !req.session.userId) {
        throw new Error("not authenticated");
      }

      try {
        const cst = await stripe.customers.create({
          name: name,
          email: email,
          description: description,
        });

        console.log(' cst : ', cst)

        return {
          name: cst.name,
          email: cst.email,
          description: cst.description
        }

      } catch (error) {
        console.log("error : ", error)
        throw new Error("Error");
      }
    }

  }
}

/*
1. To subscription , we should have the plan
2. To create plan , go to stipe Dashboard - Billing - Subscriptions (where we can see users that are subscribed )

3. For Subscription we are going to create a product

*/
