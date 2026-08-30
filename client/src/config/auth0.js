const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN?.trim(),
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID?.trim(),
  audience: import.meta.env.VITE_AUTH0_AUDIENCE?.trim(),
  adminScope: import.meta.env.VITE_AUTH0_ADMIN_SCOPE?.trim() || 'admin:access',
};

const missingAuth0Values = Object.entries(auth0Config)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingAuth0Values.length > 0) {
  throw new Error(
    `Missing Auth0 configuration: ${missingAuth0Values.join(', ')}. ` +
      'Copy client/.env.example to client/.env and configure the VITE_AUTH0_* values.'
  );
}

function getAuth0RuntimeUrls(
  origin = window.location.origin,
  baseUrl = import.meta.env.BASE_URL
) {
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return {
    redirectUri: `${origin}${normalizedBaseUrl}user/info`,
    logoutUri: `${origin}${normalizedBaseUrl}`,
  };
}

export { auth0Config, getAuth0RuntimeUrls };
