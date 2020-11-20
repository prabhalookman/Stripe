import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { CreateSubscriptionMutation,CreateSubscriptionMutationVariables} from "../../schemaTypes";

const createSubMutation = gql`
  mutation CreateSubscriptionMutation($source: String!) {
    createSubscription(source: $source) {
        id,
        email,
        type
    }
  }
`;
//...UserInfo
export default class SubscribeUser extends React.PureComponent {
    render() {
        return (
            <Mutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables> mutation={createSubMutation}>
                {mutate => (

                    // going to grab the users credit card and then when it's done sending that to stripe server this callback gets called and gives us a token that we can do stuff with
                    <StripeCheckout
                        token={async token => {
                            const response = await mutate({ variables: { source: token.id } });
                            console.log("Supscibe Response : ",  response);
                            console.log("Supscibe Token : " , token)
                        }}
                        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
                        amount={1000}
                    />
                    // we have some IDS and Card details. we have to care here about token - this token is what we're gonaa send this server and we can use this token to tie the user onto their credit card and then charge them first subscription

                    // We need to set up on the server to be able to receive token and do something with it
                )}
            </Mutation>
        )
    }
}