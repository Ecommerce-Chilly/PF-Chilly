import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/tailwind.css';
import App from './App';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate';

import axios from 'axios';
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL ||
  'https://pf-chilly-back-production.up.railway.app/';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename="/PF-Chilly/">
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </Provider>
);
