import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Auth0Provider domain='dev-a7wdrnzfxda6apf4.us.auth0.com' clientId= 'jDZYtUvwTQKUUQAkQoB6qIxGK2w046B0' redirectUri ={window.location.origin} >
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
