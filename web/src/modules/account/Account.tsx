import * as React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import { meQuery } from "../../schemaTypes";
import SubscribeUser from "./SubscribeUser";
import  meQuryVar  from '../../graphql/queries/me';
import ChangeCreditCard from './ChangeCreditCard';
import { CancelSubscription } from "./CancelSubscription";


export class Account extends React.PureComponent {
  
  render() {
    return (
      //fetchPolicy="network-only" - Catching yours
      <Query<meQuery>  query={meQuryVar}>
        {({ data, loading }) => {
          console.log("Account Data : ", data)

          if (loading) {
            return null;
          }

          if (!data) {
            return <div>Data Is Undefined</div>;
          }

          if (!data.me) {
            return <Redirect to="/login" />;
          }

          if (data.me.type === "free-trail") {
            return <SubscribeUser />;
          }

          //if (data.me.type === 'paid')
          return(<div>
            <div>Your Current Credit Card Last Digit : {data.me.ccLast4}</div>
            <ChangeCreditCard />
            <CancelSubscription />
          </div>)
          //return <Redirect to="/paid-users" />;
        // return <div>Thanks For Buying Our Product</div>

        }}
      </Query>
    );
  }
}