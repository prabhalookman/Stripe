import { IResolvers } from "graphql-tools";
import * as bcrypt from 'bcryptjs';
import { MyUser } from "./entity/MyUser";

export const resolvers : IResolvers = {
    Query:{
        hello: ()=>{
            return 'Hi'
        }    
    },
    Mutation:{
        register: async (_, {email, password}) => {
            const hashedPassword = await bcrypt.hash(password, 10);            
            const result = await MyUser.create({
                email,
                password: hashedPassword
            }).save();
            console.log('Success : ', result)

            return true;
        }
    }
}