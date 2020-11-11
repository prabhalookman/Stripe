/*
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
*/

import { createConnection } from 'typeorm';
import {ApolloServer} from 'apollo-server-express';
import * as express from 'express';
import * as session from 'express-session';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';


//     Now inside of my resolver, I want to be able to add a cookie for that user 
// so i can do that by accessing now that we added the session here, on the request 
// object there is a session so we can get access to that in our context

const startServer = async () => {    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ( { req } : any)=>({ req })
    });

    await createConnection();
    
    const app = express();

    //When i started this session or when we add the session to the middleware here.
    //We can have it store the data in different places. Right now we're just storing it in memory 
    //but we can have the store to Redis or a database or whatever 
    //but the it's in memory what that means is as soon as i turn off my server it's gonna forget all the past sessions.

    app.use(session({
        secret:"abc",
        resave: false,
        saveUninitialized: false
    }))
    
    server.applyMiddleware({
        app,
        cors: {
            credentials:true,
            origin: "http://localhost:3000"
        }
    });
    
    app.listen({ port: 4000 }, ()=>{
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    })
}

startServer()