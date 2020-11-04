FileUpload
    - Individual
    - FormData

Authentication
    - Basic
    - JWT
    - oAuth 2.0

Build
    - Babel
    - Webpack

Deployment
    - Docker



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