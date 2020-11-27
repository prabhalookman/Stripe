import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";
import { RegisterMutationVariables, RegisterMutation } from "../../schemaTypes";

const registerMutDef = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export class RegisterView extends React.PureComponent<RouteComponentProps<{}>> {
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
      <Mutation<RegisterMutation, RegisterMutationVariables> mutation={registerMutDef} >
        {mutate => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <h2>Register</h2>
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
                  const response = await mutate({
                    variables: this.state
                  });
                  console.log("Register Submit : ",response);
                  this.props.history.push("/login");
                }}
              >Register
              </button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
