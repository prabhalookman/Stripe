import { gql } from 'apollo-boost';
import { userFragment } from "../fragments/userFragment";


const meQuryVar = gql`
  query meQuery {
    me {
      ...UserInfo
      }
    }
    ${userFragment}
`;

//id, email, type

//We want to use this same meQuery multiple times like "Subscription", "ChangeCreditCard". For that we can create a "fragement" and reuse multiple place

export default meQuryVar