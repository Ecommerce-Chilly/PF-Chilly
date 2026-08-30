const DEFAULT_PORT = 3001;

function readEnvironment(environment = process.env) {
  const databaseUrl = environment.DB_DEPLOY?.trim();

  if (!databaseUrl) {
    throw new Error(
      'Missing DB_DEPLOY. Copy api/.env.example to api/.env and configure PostgreSQL.'
    );
  }

  const auth0Audience = environment.AUTH0_AUDIENCE?.trim();
  const auth0IssuerBaseUrl = environment.AUTH0_ISSUER_BASE_URL?.trim();

  if (!auth0Audience || !auth0IssuerBaseUrl) {
    throw new Error(
      'Missing Auth0 API configuration. Set AUTH0_AUDIENCE and AUTH0_ISSUER_BASE_URL in api/.env.'
    );
  }

  let normalizedIssuerBaseUrl;
  try {
    normalizedIssuerBaseUrl = new URL(auth0IssuerBaseUrl).toString();
  } catch {
    throw new Error('AUTH0_ISSUER_BASE_URL must be a valid absolute URL.');
  }

  const port = Number(environment.PORT || DEFAULT_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return {
    databaseUrl,
    port,
    auth0Audience,
    auth0IssuerBaseUrl: normalizedIssuerBaseUrl,
    auth0AdminScope: environment.AUTH0_ADMIN_SCOPE?.trim() || 'admin:access',
  };
}

module.exports = { DEFAULT_PORT, readEnvironment };
