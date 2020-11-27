import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";
import  meQuery from "../../graphql/queries/me";


import { LoginMutationVariables, LoginMutation } from "../../schemaTypes";

const loginMutDef = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password){
        id
        email
        type
    }
  }
`;

export class LoginView extends React.PureComponent<RouteComponentProps<{}>> {
  state = {
    email: "",
    password: ""
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { password, email } = this.state;
    return (      
      <Mutation<LoginMutation, LoginMutationVariables> 
      // After the Login we need to update the me to replace the null
      update = {
        (cache, {data } ) => { 
          console.log("Login Cache Data : ", data)
        
        if(!data || !data.login){
          return;
        }
        cache.writeQuery({
          query: meQuery,
          data: { me: data.login }
        });
        }
      }//main
      mutation={loginMutDef} >
        {
        (mutate, {client}) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <h2>Login</h2>
            <div className="form-group">
              <input className="form-control"
                type="text"
                name="email"
                placeholder="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input className="form-control"
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button className="btn btn-info"
                onClick={async () => {
                  //optional reset cache
                  //await client?.resetStore()
                  const response = await mutate({
                    variables: this.state
                  });
                  console.log("Login Submit : ",response);
                  this.props.history.push("/account");
                }}
              >
                Login
              </button>
            </div>
          </div>
        )
        }         
      </Mutation>
    );
  }
}
