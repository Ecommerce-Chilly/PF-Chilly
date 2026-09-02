import { useCallback } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { auth0Config, getAuth0RuntimeUrls } from '../config/auth0';

function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();
  const { redirectUri } = getAuth0RuntimeUrls();
  const onRedirectCallback = useCallback(
    (appState) => {
      navigate(appState?.returnTo || '/user/info', { replace: true });
    },
    [navigate]
  );

  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: auth0Config.audience,
        scope: `openid profile email ${auth0Config.adminScope}`,
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithNavigate;
