import axios from 'axios';
import clearStorage from './clearLocalStorage';
import setHeader from '../utils/setHeader';
import React, { Component } from 'react';
import { Redirect,  Route } from 'react-router-dom';


function Check ({component: Component, authed, ...rest}) {

    return (
       

      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }


export default Check
