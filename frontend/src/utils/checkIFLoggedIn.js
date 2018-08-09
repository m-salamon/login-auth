import axios from 'axios';
import clearStorage from './clearLocalStorage';
import setHeader from '../utils/setHeader';
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';



const authenticate = async () => {
  // var a = localStorage.getItem('userId')
  try {
     var a = await axios.get('/api/users/checkLog', setHeader())
     return a
  } catch (e) {
    console.log('what')
  }

}



const PrivateRoute = ({ component: Component, authed, ...rest }) => {


  return (
    <Route {...rest} render={(props) =>
      authed
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute
