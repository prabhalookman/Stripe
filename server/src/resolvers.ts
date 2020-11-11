import { IResolvers } from "graphql-tools";
import * as bcrypt from 'bcryptjs';
import { MyUser } from "./entity/MyUser";

export const resolvers : IResolvers = {
    Query:{
        hello: ()=>{
            return 'Hi'
        },
        me: (_, __, {req})=>{

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
            
            //How i'm gonna know that the user is who they are ? is we're gonna store a cookie on them and in our server we're gonna store the user ID on our server.
            req.session.userId = user.id;

            //When i set the user ID right here a request session or express-session knows to add a cookie to the user. 
            //So now a cookie gonna get sent whenever we do login .
            console.log("user Info : ", user);

            return user;
        }
    }
}