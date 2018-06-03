import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './main';
import Login from './components/login';
import ResetPassword from './components/resetPassword';
import ForgotPassword from './components/forgotPassword';
import SignUp from './components/signUp';
import VerifyEmail from './components/verifyEmail';
import Verify from './components/verify';
import forgotPassword from './components/forgotPassword';
import resetPassword from './components/resetPassword';
import Profile from './screens/profile';
import My404Component from './components/my404Component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route path="/resetPassword/:tempToken" component={ResetPassword} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/verify/:token" component={Verify} />
            <Route path="/verifyEmail/:tempToken" component={VerifyEmail} />
            <Route path="/resetPassword/:tempToken" component={resetPassword} />
            <Route path="/forgotPassword" component={forgotPassword} />
            <Route path="/profile" component={Profile} />
            <Route component={ My404Component } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
