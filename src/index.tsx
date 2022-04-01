import React from 'react';

// eslint-disable-next-line import/order
import ReactDOM from 'react-dom';

import './index.css';

import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

import App from 'App';
import { store } from 'store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
