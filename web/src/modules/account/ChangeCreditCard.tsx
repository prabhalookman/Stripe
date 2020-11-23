import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { ChangeCreditCardMutation,ChangeCreditCardMutationVariables} from "../../schemaTypes";
import { userFragment } from "../../graphql/fragments/userFragment"

const changeCardMutDef = gql`
    mutation ChangeCreditCardMutation($source: String!, $ccLast4: String!){
        changeCreditCard(source: $source, ccLast4: $ccLast4) {
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
                            const response = await mutate({ variables: { source: token.id, ccLast4: token.card.last4 } });
                            console.log("Change Credit Card Response : ",  response);
                            console.log("Change Credit Card Token : " , token)
                        }}
                        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
                        amount={1000}
                    />)
                }

            </Mutation>
        )
    }
}
