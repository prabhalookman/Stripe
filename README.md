# Server
**npm install typeorm -g**
> typeorm init --name server --database postgres  

**yarn**
> yarn upgrade-interactive --latest  

// Postgres - DB  
```
-- Database: stripe  

-- DROP DATABASE stripe;  

CREATE DATABASE stripe
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;  
```

// yarn Version run v1.22.4  

yarn add apollo-server-express graphql express express-session bcryptjs  

yarn add -D @types/express @types/bcryptjs @types/express-session @types/graphql  

dropdb stripe  
createdb stripe  
yarn start  

[3_stripe_create_customer](https://github.com/benawad/graphql-typescript-stripe-example/tree/3_stripe_create_customer)

Normal Start : 
"scripts": {
      "start": "ts-node src/index.ts"
   }  


//Nodemon Start
"scripts": {
    "start": "nodemon --exec ts-node src/index.ts"
  }  

# Error1 : 

Type 'typeof import("stripe")' has no construct signatures

# Solutions : 
Install the types

npm install --dev @types/stripe-node
or
yarn add @types/stripe-node -D
Import the package and use the exported constructor

import * as Stripe from 'stripe';
const stripe = new Stripe(stripeKey);

https://github.com/stripe/stripe-node/issues/296

------------------------------------------------------------------------------------------------------
# Client
```
create-react-app-typescript  -- Deprecated 
https://github.com/wmonk/create-react-app-typescript
⛔ DEPRECATED ⛔
create-react-app now supports typescript natively - read the guide for adding typescript to existing projects.  

[adding-typescript](https://create-react-app.dev/docs/adding-typescript/)
Create Directory : "web"
Execute Command From Root Directory : npx create-react-app web --template typescript

Install packages inside "Web" : yarn add react-router-dom apollo-boost graphql react-apollo  
Install ts packages inside "Web" : yarn add -D @types/react-router-dom apollo @types/graphql  
npm install -d nodemon  
```

**yarn upgrade @types/react@latest**
> https://stackoverflow.com/questions/58180170/type-xxx-is-missing-the-following-properties-from-type-elementclass-context

**npm install tslib -s**
> https://www.codegrepper.com/code-examples/css/This+syntax+requires+an+imported+helper+but+module+%27tslib%27+cannot+be+found.

**npm install --save-dev @types/react-router**
> https://stackoverflow.com/questions/44250465/react-router-typescript-type-error
> https://www.pluralsight.com/guides/react-router-typescript

**npm install --save @types/react**
> https://www.npmjs.com/package/@types/react

**npm install apollo-boost**
> https://snyk.io/advisor/npm-package/apollo-boost

**npm install apollo-client apollo-cache-inmemory apollo-link-http react-apollo graphql-tag graphql --save**

**Run npm list graphql - Then, check the highest version you found graphql.**

## Error  1 :
E:\Prabha\NEW_HMISSERVER\Stripe\web>yarn schema:download
yarn run v1.22.4
$ apollo schema:download --endpoint=http://localhost:4000/graphql
  √ Loading Apollo Project
  × Saving schema to schema.json
    → spurious results.
    Error: Cannot use GraphQLSchema "[object GraphQLSchema]" from another module or realm.

    Ensure that there is only one instance of "graphql" in the node_modules
    directory. If different versions of "graphql" are the dependencies of other
    relied on modules, use "resolutions" to ensure only one version is installed.

    https://yarnpkg.com/en/docs/selective-version-resolutions

    Duplicate "graphql" modules cannot be used at the same time since different
    versions may have different capabilities and behavior. The data from one
    version used in the function from another could produce confusing and
    spurious results.
error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

## Solution : 
1. Add this property in package.json : 
"resolutions":{
    "graphql": "^15.0.0"
  }
2. Remove node_modules in the base directory of the monorepo
3. Add "resolutions":{"graphql":"^15.0.0"} to the package.json in the base directory
4. Run yarn install in the base directory.

## Solution 2 
E:\Prabha\NEW_HMISSERVER\Stripe\web>npm list  graphql
web@0.1.0 E:\Prabha\NEW_HMISSERVER\Stripe\web
+-- apollo@2.31.0
| +-- apollo-language-server@1.24.0
| | `-- UNMET PEER DEPENDENCY graphql@15.4.0
| `-- graphql@15.4.0
`-- UNMET PEER DEPENDENCY graphql@15.4.0

npm ERR! peer dep missing: graphql@^14.3.1, required by react-apollo@3.1.5
npm ERR! peer dep missing: graphql@^0.10.0 || ^0.11.0 || ^0.12.0 || ^0.13.0 || ^14.0.0, required by @apollographql/graphql-language-service-interface@2.0.2

When u get Peer Dependency Error you need to install those packages

E:\Prabha\NEW_HMISSERVER\Stripe\web>npm install apollo apollo-language-server graphql
https://stackoverflow.com/questions/35738346/how-do-i-fix-the-npm-unmet-peer-dependency-warning

## Execute  2 :
1. yarn schema:download
2. yarn codegen:generate

Old : "codegen:generate": "apollo codegen:generate --queries=./src/**/*.tsx --schema=./schema.json --outputFlat --target=typescript ./src/schemaTypes.ts",
## Error 3 : 
E:\Prabha\NEW_HMISSERVER\Stripe\web>yarn codegen:generate
yarn run v1.22.4
$ apollo codegen:generate --queries=./src/**/*.tsx --schema=./schema.json --outputFlat --target=typescript ./src/schemaTypes.ts
 »   Error: Unexpected argument: ./src/schemaTypes.ts
 »   See more help with --help
error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

## Solution : 
Do following changes in package.json : 
"codegen:generate": "apollo client:codegen --localSchemaFile=./schema.json --target=typescript --outputFlat"
or
"codegen:generate": "apollo client:codegen --localSchemaFile=./schema.json --outputFlat --target=typescript ./src/schemaTypes.ts",
or
"codegen:generate": "apollo client:codegen --queries=./src/**/*.tsx --localSchemaFile=./schema.json --outputFlat --target=typescript ./src/schemaTypes.ts",
or
"codegen:generate": "apollo codegen:generate --queries=./src/**/*.tsx --localSchemaFile=./schema.json --outputFlat --target=typescript ./src/schemaTypes.ts",

# Result
E:\Prabha\NEW_HMISSERVER\Stripe\web>yarn codegen:generate
yarn run v1.22.4
$ apollo client:codegen --localSchemaFile=./schema.json --target=typescript --outputFlat
  √ Loading Apollo Project
  √ Generating query files with 'typescript' target - wrote 2 files
Done in 1.25s.

https://github.com/apollographql/apollo-tooling/issues/909
https://github.com/apollographql/apollo-tooling/issues/678
https://github.com/benawad/monorepo-boilerplate/issues/8

---------------------
```
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

cors: {
    credentials:true,
    origin: "http://localhost:3000"
}
```
# To Run Appliation :
1. cd server
  - yarn start
2. cd web
  - yarn gen:types
3. cd web
  - yarn start
4. [Browser](http://localhost:3000/register) http://localhost:3000/login
---------------------
# Stripe - CLIENT
[react-stripe-checkout](https://github.com/azmenak/react-stripe-checkout)
**Installation on web**
npm install react-stripe-checkout

StripeCheckout going to grab the users credit card and then when it's done sending that to stripe server this callback gets called and gives us a token that we can do stuff with

we have some IDS and Card details. we have to care here about token - this token is what we're gonaa send this server and we can use this token to tie the user onto their credit card and then charge them first subscription

We need to set up on the server to be able to receive token and do something with it 

# Stripe - SERVER 
First we need to set up stripe node , below is the sdk that we're gonna use , we have to install
-npm install stripe --save
-yarn add -D @types/stripe

**Add .env**
-yarn add dotenv

## Note : 

Old ->  "codegen:generate": "apollo codegen:generate --queries=./src/**/*.tsx --localSchemaFile=./schema.json --outputFlat --target=typescript ./src/schemaTypes.ts"

New -> "codegen:generate": "apollo codegen:generate --queries='./src/**/*.{ts,tsx}' --localSchemaFile=./schema.json --outputFlat --target=typescript ./src/schemaTypes.ts"

if you want to affect both .ts and .tsx extensions, use the following syntax : --queries='./src/**/*.{ts,tsx}' (note also the additional single quotes around the path, otherwise it doesn't work)

[x] [Server-stripe-node](https://github.com/stripe/stripe-node)  
[] [react-stripe-elements](https://github.com/stripe/react-stripe-elements)  
[] [react-stripe-checkout](https://github.com/azmenak/react-stripe-checkout)  
[] [Stripe-API](https://stripe.com/docs/api)  
[] [Web-Paid] (https://github.com/benawad/graphql-typescript-stripe-example/tree/4_conditional_render/web)  

[Saving and reusing cards (SCA) by Stripe Developers] (https://www.youtube.com/watch?v=95qSebQrm5E)
[Stripe with React and node crash course] (https://www.youtube.com/watch?v=lbEFSP1WAv0)

[To create a Product](https://stripe.com/docs/payments/checkout/client)

[API](https://stripe.com/docs/api/products/create)
https://stripe.com/docs/payments/checkout/client#create-products-and-prices
https://stripe.com/docs/billing/subscriptions/overview
https://stripe.com/docs
[Subscription Flow Docs](https://stripe.com/docs/billing/subscriptions/overview)
------------------------------------
# Error : Argument of type '{ customer: string; items: { plan: string; }[]; }' is not assignable to parameter of type 'ISubscriptionCreationOptions stripe

//Dev
"typescript": "4.0.5",
"@types/node": "^14.14.6",
"@types/stripe": "^7.13.25",

"@types/stripe-node": "^4.7.1", //Removed for avoid above error

//Dependency
"stripe": "^8.121.0"

npm uninstall --save typescript
npm uninstall --save @types/node @types/stripe @types/stripe-node
npm uninstall --save stripe

npm install --save-dev typescript@3.1.1 @types/node@^10.11.3 @types/stripe@^6.0.0
npm install --save stripe@^6.12.1
-------------------------
yarn add styled-components@beta
yarn add -D @types/styled-components
---------------

## Server Error : 
When we call the stripe api for example (stripe.prices.list({})), we were getting error the definition not available . 

# Solution : 
so we inspect the packages about @type/stripe & @type/stripe-node. 

Within the "node_modules/@types" we try to find the stripe d.ts definition file. but the had only the Readme file inside the stripe folder and it mentioned as shown below.

This is a stub types definition for @types/stripe (https://github.com/stripe/stripe-node).
stripe provides its own type definitions, so you don't need @types/stripe installed!

It means no need the @types/stripe package. So we removed both the "@type/stripe & @type/stripe-node". then the api price call issue resolved .
--------------------
import * as Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SCECRET!);

## Server Error : 
This expression is not constructable. Type 'typeof import("stripe")' has no construct signatures.



npm outdated
-------------------
[stripe-samples / checkout-one-time-payments ](https://github.com/stripe-samples/checkout-one-time-payments/tree/master/server/node)
[Stripe Samples](https://github.com/stripe-samples)
[Stripe Checkout](https://stripe.com/docs/payments/checkout)
[SetupIntents](https://stripe.com/docs/api/setup_intents)
[typescript-react-stripe](https://github.com/stripe-samples/nextjs-typescript-react-stripe-js/tree/4ecd56f3a9541d4a99b70b944f3eee834d19fbfa)