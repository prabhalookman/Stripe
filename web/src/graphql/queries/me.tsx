import { gql } from 'apollo-boost';
import { userFragment } from "../fragments/userFragment";


const meQuryVar = gql`
  query meQuery {
    me {
      ...UserInfo
    }
    ${userFragment}
}`;

//id, email, type

export default meQuryVar