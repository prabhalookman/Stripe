import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginView } from './modules/user/LoginView';
import { RegisterView } from './modules/user/RegisterView';
import { Account } from './modules/account/Account';
import SubscribeUser from './modules/account/SubscribeUser';
import { PaidUsers } from './modules/account/PaidUsers';
import Header from './shared/Header';
import CreateProduct from './modules/account/CreateProduct';

export class Routes extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>

        <Switch>
          <Route path="/login" component={LoginView} />
          <Route path="/"
            render={() => (
              <React.Fragment>
                <Header />
                <div>
                  <Route path="/register" component={RegisterView} />
                  <Route path="/account" component={Account} />
                  <Route path="/SubscribeUser" component={SubscribeUser} />
                  <Route path="/paid-users" component={PaidUsers} />
                  <Route path="/createProd" component={CreateProduct} />
                  <Route exact={true} path="/" render={() => <div style={{ textAlign: "center", fontSize: "24px", fontWeight:"bold" }}>Home Page</div>} />
                </div>
              </React.Fragment>)}
          />{ /* Route End */}
        </Switch>

      </BrowserRouter>
    );
  }
}