import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';

import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'https://pf-chilly-back-production.up.railway.app/'; 

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider domain='dev-r6cdo8stlhgup2wx.us.auth0.com' clientId='B25HIG5uEk2dTfKdwH4AnevOmXrXLHp6' redirectUri={'https://Ecommerce-Chilly.github.io/user/info'} audience="https://chillydev-arg/api/v1/" scope='admin:ReAdminPa update:current_user_metadata '>
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
