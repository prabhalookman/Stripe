import * as React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

import { userFragment } from "../../graphql/fragments/userFragment";
import { CancelSubscriptionMutation } from "../../schemaTypes";

const cancelSubscriptionMutDef = gql`
  mutation CancelSubscriptionMutation {
    cancelSubscription {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export class CancelSubscription extends React.PureComponent {
  render() {
    return (
      <Mutation<CancelSubscriptionMutation>
        mutation={cancelSubscriptionMutDef}
      >
        {mutate => (
          <button className="btn btn-danger" onClick={() => mutate()} >cancel subscription</button>
        )}
      </Mutation>
    );
  }
}