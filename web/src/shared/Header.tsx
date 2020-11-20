import React, { PureComponent } from 'react'
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom'
import meQuryVar from '../graphql/queries/me';
import { meQuery } from '../schemaTypes';

export default class Header extends PureComponent {
    render() {
        return (
            <div style={{
                height: 50,
                width: "100%",
                backgroundColor: "#fafafa",
                display: "flex",
                justifyContent: "space-around",
                padding: 10
            }}>
                <Link to="/">
                    <h2 style={{ position: "absolute", left: "25px" }}>Stripe Subscription</h2>
                </Link>

                {/*  */}

                <Query<meQuery> query={meQuryVar}>
                    {({ data, loading }) => {
                        if (loading || !data) {
                            return null;
                        }
                        
                        if(!data.me){
                            return (<div>
                                <div>
                                    <Link to="/login">Login</Link>
                                </div>
                                <div>
                                    <Link to="/register">Register</Link>
                                </div>                                
                            </div>)
                        }
                        
                        //User is logged in
                        return (<div>
                            <div>
                                <Link to="/account">Account</Link>
                            </div>
                            <div>
                                    <Link to="/createProd">Create Product</Link>
                            </div>
                        </div>)
                    }
                }</Query>
            </div> //End
        )
    }
}