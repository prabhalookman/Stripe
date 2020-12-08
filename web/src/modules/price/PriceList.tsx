import React, { PureComponent } from 'react'
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { priceLs } from "../../schemaTypes";

const productListQuryVar = gql`
query priceLs {
    priceList{
        id,
        currency,
        product,
        recurring{
            interval
        }
    }
}
`

export default class PriceList extends PureComponent {
    render() {
        return (<div>
            <h2>Price List</h2>
            <Query<priceLs> query={productListQuryVar}>
                {
                    ({ data, loading }) => {
                        if (loading) {
                            return null
                        }
                        console.log("data price : ", data);

                        if (!data) {
                            return <div>Data is Undefined</div>
                        }
                        return <div>
                            <ul>
                                {data.priceList?.map(key => (<li key={key?.id}>{key?.id} - {key?.product} - {key?.recurring?.interval}</li>))}
                            </ul>
                        </div>
                    }
                }
            </Query>
        </div>)
    }
}
