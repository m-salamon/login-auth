import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import Login from './screens/login';
import SignUp from './screens/signUp';
import ResetPassword from './screens/resetPassword';
import ForgotPassword from './screens/forgotPassword';
import VerifyEmail from './components/verifyEmail';
import Verify from './components/verify';
import Profile from './screens/profile';
import ErrorPage from './Essentials/ErrorPage';
import PrivateRoute from './Essentials/PrivateRoute';
import LogOut from './Essentials/LogOut';


class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    await this.props.CheckIFLoggedIn()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div>
              <p>In the main page!</p>
              <Link to={'/login'}><button className="btn">Login</button> </Link>
              <Link to={'/logout'}><button className="btn">LogOut</button> </Link>
              <Link to={'/signup'}><button className="btn">Signup</button> </Link>
              <Link to={'/resetPassword'}><button className="btn">Reset Password</button> </Link>
              <Link to={'/forgotPassword'}><button className="btn">Forgot Password</button> </Link>
              <Link to={'/profile'}><button className="btn">Profile</button> </Link>
            </div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/resetPassword/:tempToken" component={ResetPassword} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/verify/:token" component={Verify} />
              <Route exact path="/verifyEmail/:tempToken" component={VerifyEmail} />
              <Route exact path="/forgotPassword" component={ForgotPassword} />
              <Route exact path="/logout" component={LogOut} />

              <PrivateRoute exact path="/profile" component={Profile} authed={this.props.checkIFLoggedIn} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ checkIFLoggedIn }) {
  return { checkIFLoggedIn: checkIFLoggedIn.authenticated }
}

function mapDispatchToProps(dispatch) {
  return {
    CheckIFLoggedIn: (state) => dispatch(actions.checkIFLoggedIn(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);