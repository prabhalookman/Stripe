import { gql } from 'apollo-boost';

const meQuryVar = gql`
  query meQuery {
    me {
      id
      email
      type
    }
}`;


export default meQuryVar