import * as React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router-dom";

import { meQuery } from "../../schemaTypes";
//import SubscribeUser from "./SubscribeUser";

const meQuryVar = gql`
  query meQuery {
    me {
      id
      email
      type
    }
  }`;

export class Account extends React.PureComponent {
  render() {
    return (
      <Query<meQuery> fetchPolicy="network-only" query={meQuryVar}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          if (!data) {
            return <div>data is undefined</div>;
          }

          if (!data.me) {
            return <Redirect to="/login" />;
          }

        //   if (data.me.type === "free-trial") {
        //     return <SubscribeUser />;
        //   }

          // if (data.me.type === 'paid')
        //   return <Redirect to="/paid-users" />;
        return <div>Thanks For Buying Our Product</div>
        }}
      </Query>
    );
  }
}