import { gql } from 'apollo-boost';
import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { CreateCustomerMutation, CreateCustomerMutationVariables } from '../../schemaTypes';
import CustomerList from './CustomerList';

const createCustomerMutDef = gql`
    mutation CreateCustomerMutation($email: String, $username: String, $description: String){
      createCustomer(email:$email, name: $username, description: $description){
        name,
        email,
        description
      }
    }
`;

interface CustomerState {
  username?: string,
  email?: string,
  description?: string
}

export default class CreateCustomer extends PureComponent<{}, CustomerState> {

  state: CustomerState = {
    username: "",
    email: "",
    description: ""
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { email: '', username: '', description: '' }
  }

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const name: any = e.currentTarget.name
    const updatedValue = e.currentTarget.value
    console.log(`${name} and the value is : ${updatedValue}`);
    this.setState(
      prevState => ({
        ...prevState,
        [name]: updatedValue,
      }),
      () => { }
    )

    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // });
  }

  render() {
    return (
      <div>
        <form >
          <h2>Create Customer {this.state.username} </h2>
          <div>
            <div className="form-group">
              <label htmlFor="username">Enter username</label>
              <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Enter your email</label>
              <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Enter your description</label>
              <input id="description" name="description" type="text" value={this.state.description} onChange={this.handleChange} className="form-control" />
            </div>

          </div>
        </form>
        <Mutation<CreateCustomerMutation, CreateCustomerMutationVariables> mutation={createCustomerMutDef} onCompleted={() => alert('success')} >
          {(onMutate) => {

            const onMutateFunc = async () => {
              const result = await onMutate(
                { variables: { email: this.state.email, username: this.state.username, description: this.state.description } }
              )
              console.log('Create Customer Client Result ', result);

            } //onMutateFunc End

            return (<button onClick={onMutateFunc} className="btn btn-danger">Submit</button>)
          } // onMutate End
          }
        </Mutation>

        <br /><hr /><br />

        <CustomerList />
      </div>
    )
  }
}

/*
import React, { Component } from 'react'; // let's also import Component

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type ClockState = {
  time: Date
}

// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export class Clock extends Component<{}, ClockState> {

  // The tick function sets the current state. TypeScript will let us know
  // which ones we are allowed to set.
  tick() {
    this.setState({
      time: new Date()
    });
  }

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.tick();
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  // render will know everything!
  render() {
    return <p>The current time is {this.state.time.toLocaleTimeString()}</p>
  }
}
*/