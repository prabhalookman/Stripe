import { IResolvers } from "graphql-tools";
import * as bcrypt from 'bcryptjs';
import { MyUser } from "./entity/MyUser";

export const resolvers : IResolvers = {
    Query:{
        hello: ()=>{
            return 'Hi'
        },
        me: (_, __, {req})=>{
            console.log("Session : ", req.session)
            console.log("SessionId : ", req.SessionId)

            if(!req.session.userId){
                return null;
            }
            return MyUser.findOne(req.session.userId)                        
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
        },
        login: async(_, {email, password}, {req} ) =>{            
            const user = await MyUser.findOne({where: {email}})
            if(!user){
                return null;
            }

            const valid = await bcrypt.compare(password, user.password)

            if(!valid){
                return null;
            }

            req.session.userId = user.id;
            console.log("Req Session Id : ", req.session.userId)

            return user;
        }
    }
}