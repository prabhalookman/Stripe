import { RSA_NO_PADDING } from 'constants';
import React, { Fragment, PureComponent } from 'react'
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom'
import meQuryVar from '../graphql/queries/me';
import { meQuery } from '../schemaTypes';


export default class Header extends PureComponent {
    render() {
        const btnStyle = {
            color: "#FFF",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            margin: "5px 10px",
            fontFamily: "Arial"
        };
        const titlestyle = {
            color: "#000",
            backgroundColor: "primary",
            padding: "10px",
            margin: "5px 10px",
            fontFamily: "Arial"
        };
        const m_20 = {
            margin: "0px 0px 50px 0px"
        };

        return (
            <div>
                <nav id="navbar-example2" className="navbar navbar-dark bg-dark" style={m_20} >
                    <Link to="/" className="nav-link btn btn-warning" style={titlestyle} >Stripe Payment</Link>
                    <ul className="nav nav-pills">
                        <Query<meQuery> query={meQuryVar}>
                            {({ data, loading }) => {
                                if (loading || !data) {
                                    return null;
                                }

                                if (!data.me) {
                                    return (<>
                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link" style={btnStyle}>Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/register" className="nav-link" style={btnStyle}>Register</Link>
                                        </li>

                                    </>)
                                }

                                //User is logged in
                                return (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/account" className="nav-link" style={btnStyle} >Subscripe</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/createCustomer" className="nav-link" style={btnStyle} >Create Customer</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/createProd" className="nav-link" style={btnStyle} >Create Product</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/createPrice" className="nav-link" style={btnStyle} >Create Price</Link>
                                        </li>
                                    </>)
                            }
                            }
                        </Query>
                    </ul>
                </nav>
            </div>
        )
    }
}