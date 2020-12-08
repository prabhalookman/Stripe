import React, { PureComponent } from 'react'
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { customerLS } from "../../schemaTypes";

const customerListQuryVar = gql`
  query customerLS {
    customerList {
        id,
        email,
        currency,
        invoice_prefix
    }
  }
`;

export default class CustomerList extends PureComponent {

    render() {
        return (
            <div>
                <h2>Customer List </h2>
                {
                    <Query<customerLS> query={customerListQuryVar}>
                        {
                            ({ data, loading }) => {
                                if (loading) {
                                    return null;
                                }

                                if (!data) {
                                    return <div>Data is Undefined</div>
                                }

                                return <div>
                                    <ul>
                                        {data.customerList?.map(key => (<li key={key?.id}>{key?.email} - {key?.id}</li>))}
                                    </ul>
                                </div>

                            } //data
                        }
                    </Query>
                }
            </div>
        )
    }
}