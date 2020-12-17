import React, { PureComponent } from 'react'
import PriceList from './PriceList'
import { gql } from 'apollo-boost';
import { Query, graphql } from "react-apollo";
import { meQuery, productLs } from "../../schemaTypes";
import InputField from '../../library/components/InputField/index'
import { Validators } from '../../library/utilities/Validators';

type IPriceState = {
    description?: string,
    prod?: IProductProps | null,
    text: string    
}

type IProductProps = {
    prodname?: string,
    description?: string,
    id?:string
}

type StateKeys = keyof IPriceState;

const productQuryVar = gql`
  query productLS {
    productList {
      id,
      description
      }
    }  
`;

type  inputState  = {
    value: string,
    label: string,
    placeholder: string,
    validators: [],
    type: string,
    onChange: (a:React.FormEvent<HTMLInputElement>) => void
}

class CreatePrice extends PureComponent<{}, IPriceState, {}> {
    state: IPriceState = {
        description: "",
        prod:{prodname:"",description:""},
        text:''
    };

    constructor(props) {
        super(props)
        this.state = { description: "", prod: {}, text:'' }
        this.handleChange = this.handleChange.bind(this)
        //var data = this.props.data;
        //console.log(' data : ' , data);
    }
    updateState(key: StateKeys, value: string) {
        if(key === 'description'){
            this.setState((prevState) => ({
                ...prevState,
                [key]: value                
            }));
        }
        this.setState((prevState) => ({
            ...prevState,            
            prod:{[key]: value}
        }));

        console.log('this.state : ', this.state);
    }

    // dynSetState<K extends StateKeys>(key: K, value: IPriceState[K]) {
    //     this.setState({ [key]: value } as Pick<IPriceState, K>); // clean cast works   
    // }

    // handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    //     e.preventDefault() as any;
    //     const name: any = e.currentTarget.name
    //     const updatedValue = e.currentTarget.value
    //     //this.dynSetState(name, updatedValue);
    //     this.updateState(name, updatedValue);
    // }

    handleChange = (key) => (value) => {
        this.setState(
            prevState => ({
              ...prevState,
              text: value,
            }),
            () => { }
          )
        
        // this.setState((prevState) => ({
        //     ...prevState,
        //     key: value                
        // }));

        console.log('this.state : ', this.state);
    };

    render() {
        const {text} = this.state
        return (<div>
            hi  <span>{JSON.stringify(this.props.children)};</span>
            <form>
                <h2>Create Price {this.state.description}</h2>
                <div className="form-group">
                    {/* <label htmlFor="username">Enter price description</label>
                    <input id="description" name="description" type="text" value={this.state.description} onChange={this.handleChange} className="form-control" /> */}
                    <InputField
                        type='text'
                        value={text}
                        placeholder='Enter text here...'
                        validators = {[{
                            check: Validators.required,
                            message: 'This field is required'
                        }]
                    }
                    onChange={this.handleChange('text' as any) as any} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Enter price name</label> - {this.state.prod?.prodname}
                    <input id="prodname" name="prodname" type="text" value={this.state.prod?.prodname} onChange={this.handleChange} className="form-control" />
                </div>
            </form>
            <button className="btn btn-danger" >Submit</button>
            <br /><br />
            <PriceList />
        </div>)
    }
}

export default graphql(productQuryVar)(CreatePrice);