import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as types from './actions/types';

// Subsequent uses
const user = localStorage.getItem('userId')

// If we have a token, consider the user to be signed in
if (user) {
   store.dispatch({ type: types.AUTH_USER })
}

if (!user) store.dispatch({ type: types.UNAUTH_USER })

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById('root')
);
registerServiceWorker();
