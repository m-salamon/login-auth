import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Login from './screens/login';
import SignUp from './screens/signUp';
import ResetPassword from './screens/resetPassword';
import ForgotPassword from './screens/forgotPassword';
import VerifyEmail from './components/verifyEmail';
import Verify from './components/verify';
import Profile from './screens/profile';
import My404Component from './components/my404Component';
import PrivateRoute from './utils/checkIFLoggedIn';


class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div>
              <p>In the main page!</p>
              <Link to={'/login'}><button className="btn">Login</button> </Link>
              <Link to={'/signup'}><button className="btn">Signup</button> </Link>
              <Link to={'/resetPassword'}><button className="btn">Reset Password</button> </Link>
              <Link to={'/forgotPassword'}><button className="btn">Forgot Password</button> </Link>
            </div>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/resetPassword/:tempToken" component={ResetPassword} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/verify/:token" component={Verify} />
              <Route exact path="/verifyEmail/:tempToken" component={VerifyEmail} />
              <Route exact path="/forgotPassword" component={ForgotPassword} />

              <PrivateRoute exact path="/profile" component={Profile} />
              <Route component={My404Component} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
