import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginView } from './modules/user/LoginView';
import { RegisterView } from './modules/user/RegisterView';
import { Account } from './modules/account/Account';
import SubscribeUser from './modules/account/SubscribeUser';
import { PaidUsers } from './modules/account/PaidUsers';
import Header from './shared/Header';
import CreateProduct from './modules/product/CreateProduct';
import CustomerList from './modules/customers/CustomerList';
import CreateCustomer from './modules/customers/CreateCustomer';
import ProductList from './modules/product/ProductList';
import CreatePrice from './modules/price/CreatePrice';

export class Routes extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>

        <Switch>
          {/* <Route path="/login" component={LoginView} /> */}
          <Route path="/"
            render={() => (
              <React.Fragment>
                <Header />
                <div className="container">
                <Route path="/login" component={LoginView} />
                  <Route path="/register" component={RegisterView} />
                  <Route path="/account" component={Account} />
                  <Route path="/SubscribeUser" component={SubscribeUser} />
                  <Route path="/paid-users" component={PaidUsers} />
                  <Route path="/createProd" component={CreateProduct} />
                  <Route path="/createPrice" component={CreatePrice} />
                  <Route path="/customerList" component={CustomerList} />
                  <Route path="/createCustomer" component={CreateCustomer} />
                  <Route path="/prodList" component={ProductList} />
                  <Route exact={true} path="/" render={() => <div style={{ textAlign: "center", fontSize: "24px", fontWeight:"bold" }}>Welcome To Stripe Payment</div>} />
                </div>
              </React.Fragment>)}
          />{ /* Route End */}
        </Switch>

      </BrowserRouter>
    );
  }
}