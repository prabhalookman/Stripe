import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { ChangeCreditCardMutation,ChangeCreditCardMutationVariables} from "../../schemaTypes";
import { userFragment } from "../../graphql/fragments/userFragment"

const changeCardMutDef = gql`
    mutation ChangeCreditCardMutation($source: String!){
        changeCreditCard(source: $source){
            ...UserInfo
        }
    }
    ${userFragment}
`;

//id,email,type

export default class ChangeCreditCard extends React.PureComponent {
    render() {
        return (
            <Mutation<ChangeCreditCardMutation,ChangeCreditCardMutationVariables> mutation={changeCardMutDef}>
                {
                    (mutate)=>(
                        <StripeCheckout
                        token={async token => {
                            const response = await mutate({ variables: { source: token.id } });
                            console.log("Supscibe Response : ",  response);
                            console.log("Supscibe Token : " , token)
                        }}
                        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
                        amount={1000}
                    />)
                }

            </Mutation>
        )
    }
}
