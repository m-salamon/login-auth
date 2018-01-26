import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './main';
import Login from './components/login';
import SignUp from './components/signUp';
import Verify from './verify';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/verify/:token" component={Verify} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
