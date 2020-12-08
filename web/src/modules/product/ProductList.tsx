import React, { PureComponent } from 'react'
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { productLs } from "../../schemaTypes";

const productListQuryVar = gql`
query productLs {
    productList {
        id,
        name,
        description
    }    
}
`;

export default class ProductList extends PureComponent {
    render(){
        return(<div>
            <h2>Product List</h2>            
                <Query<productLs> query={productListQuryVar}>
                {
                    ({data, loading}) => {
                        if(loading){
                            return null;
                        }

                        if(!data){
                            return <div>Data is Undefined</div>
                        }

                        return <div>
                            <ul>
                                {data.productList?.map(key => (<li key={key?.id}>{key?.name} - {key?.id}</li>))}
                            </ul>
                        </div>
                    }
                }
            </Query>    
        </div>)
    }
}