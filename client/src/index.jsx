import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/tailwind.css';
import App from './App';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config, getAuth0RuntimeUrls } from './config/auth0';

import axios from 'axios';
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL ||
  'https://pf-chilly-back-production.up.railway.app/';

const { redirectUri } = getAuth0RuntimeUrls();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename="/PF-Chilly/">
      <Auth0Provider
        domain={auth0Config.domain}
        clientId={auth0Config.clientId}
        cacheLocation="localstorage"
        authorizationParams={{
          redirect_uri: redirectUri,
          audience: auth0Config.audience,
          scope: `openid profile email ${auth0Config.adminScope}`,
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>
);
