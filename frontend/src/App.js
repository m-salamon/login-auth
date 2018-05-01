import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './main';
import Login from './components/login';
import ResetPassword from './components/resetPassword';
import ForgotPassword from './components/forgotPassword';
import SignUp from './components/signUp';
import VerifyEmail from './components/verifyEmail';
import Verify from './verify';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route path="/resetPassword/:tempToken" component={ResetPassword} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/verify/:token" component={Verify} />
            <Route path="/verifyEmail/:tempToken" component={VerifyEmail} />

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
