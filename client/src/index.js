import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';

import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Auth0Provider domain={process.env.REACT_APP_AUTH0_DOMAIN} clientId={process.env.REACT_APP_AUTH0_CLIENT_ID} redirectUri={process.env.REACT_APP_AUTH0_REDIRECT_URI} audience={process.env.REACT_APP_AUTH0_AUDIENCE} scope={process.env.REACT_APP_AUTH0_SCOPE}>
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
