import React, { PureComponent } from 'react'
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { CreateProductMutation, CreateProductMutationVariables } from '../../schemaTypes';
import ProductList from './ProductList';

const createProductMutDef = gql`
    mutation CreateProductMutation($name: String, $description: String){
        createProduct(product : {name: $name, description: $description}) {
            id,
            name,
            description
        }
    }
`;

interface IProductState {
    prodname?: string,
    description?: string
}

export default class CreateProduct extends PureComponent<{}, IProductState> {
    state: IProductState = {
        prodname: "",
        description: ""
    };

    constructor(props) {
        super(props)
        this.state = { prodname: "", description: "" }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const name: any = e.currentTarget.name
        const updatedValue = e.currentTarget.value
        this.setState(
            prevState => ({
                ...prevState,
                [name]:updatedValue
            }),
            ()=>{}
        )
    }

    render() {
        return (<div>
            <form>
                <h2>Create Product {this.state.prodname}</h2>
                <div className="form-group">
                    <label htmlFor="username">Enter product name</label>
                    <input id="prodname" name="prodname" type="text" value={this.state.prodname} onChange={this.handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Enter product description</label>
                    <input id="description" name="description" type="text" value={this.state.description} onChange={this.handleChange} className="form-control" />
                </div>
            </form>

            <Mutation<CreateProductMutation, CreateProductMutationVariables> mutation={createProductMutDef} onCompleted={() => { this.setState({prodname: "", description:""})} } >
                {(onMutate) => {

                    const onMutateFu = async () => {
                        const result = await onMutate({variables: {name: this.state.prodname, description : this.state.description}})
                        console.log('Create Product Client Result ', result);
                    } // onMutateFu End

                    return (<button onClick={onMutateFu} className="btn btn-primary" >Submit</button>)
                } //onMutate End
                }
            </Mutation>
            <br /><br /><br />
            <ProductList/>
        </div>)
    }
}