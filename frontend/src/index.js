import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './Essentials/App';
import registerServiceWorker from './registerServiceWorker';
import * as types from './actions/types';

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById('root')
);
registerServiceWorker();
