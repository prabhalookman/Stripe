import React, { PureComponent } from 'react'
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { CreateProductMutation, CreateProductMutationVariables } from '../../schemaTypes';

const createProductMutDef = gql`
    mutation CreateProductMutation($email: String!){
        createProduct(email: $email)
    }
`;

export default class CreateProduct extends PureComponent {
    state = {
        email: "ram25@gmail.com",
        password: ""
      };

    render() {
        return (
            <Mutation<CreateProductMutation, CreateProductMutationVariables> mutation={createProductMutDef} >
            {mutate => (
                <button className="btn btn-danger" onClick={() => mutate({variables: this.state})} >Create Product</button>
            )}
          </Mutation>
        )
    }
}