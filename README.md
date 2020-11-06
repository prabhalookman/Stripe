



npm install typeorm -g  
typeorm init --name server --database postgres  

yarn  
yarn upgrade-interactive --latest  

// Postgres - DB  

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

// yarn Version run v1.22.4  

yarn add apollo-server-express graphql express express-session bcryptjs  

yarn add -D @types/express @types/bcryptjs @types/express-session @types/graphql  

dropdb stripe  
createdb stripe  
yarn start  

https://github.com/benawad/graphql-typescript-stripe-example/tree/3_stripe_create_customer  

//Normal Start : 
"scripts": {
      "start": "ts-node src/index.ts"
   }  


//Nodemon Start
"scripts": {
    "start": "nodemon --exec ts-node src/index.ts"
  }  

create-react-app-typescript  -- Deprecated 
https://github.com/wmonk/create-react-app-typescript
⛔ DEPRECATED ⛔
create-react-app now supports typescript natively - read the guide for adding typescript to existing projects.  

https://create-react-app.dev/docs/adding-typescript/
Create Directory : "web"
Execute Command From Root Directory : npx create-react-app web --template typescript

Install packages inside "Web" : yarn add react-router-dom apollo-boost graphql react-apollo  
Install ts packages inside "Web" : yarn add -D @types/react-router-dom apollo @types/graphql  
npm install -d nodemon  
