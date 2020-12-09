# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command


# To create DB
index.js
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

Versions :

https://developer.aliyun.com/mirror/npm/package/@types/stripe
https://www.npmjs.com/package/@types/stripe?activeTab=dependencies

----------
Nodemon Sample : 
{
    "restartable": "rs",
    "ignore": [".git", "node_modules/**/node_modules"],
    "verbose": true,
    "execMap": {
      "ts": "node --require ts-node/register"
    },
    "watch": ["src/"],
    "env": {
      "NODE_ENV": "development"
    },
    "ext": "js,json,ts"
  }
  -------------
  # Debug : 
  https://github.com/TypeStrong/ts-node/issues/537
  https://stackoverflow.com/questions/49042830/why-does-the-node-inspector-not-start-when-i-am-using-nodemon-and-ts-node

  # Typescript Debug : 

  How to debug TypeScript with VS Code
  https://medium.com/@PhilippKief/how-to-debug-typescript-with-vs-code-9cec93b4ae56

  nodejs-with-typescript-debug-inside-vscode-and-nodemon
  https://dev.to/oieduardorabelo/nodejs-with-typescript-debug-inside-vscode-and-nodemon-23o7

  debug-typescript-in-vs-code-without-compiling-using-ts-node-
  https://medium.com/@dupski/debug-typescript-in-vs-code-without-compiling-using-ts-node-9d1f4f9a94a