import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'; 
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider domain='dev-r6cdo8stlhgup2wx.us.auth0.com' clientId= 'B25HIG5uEk2dTfKdwH4AnevOmXrXLHp6' redirectUri={window.location.origin} >
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
