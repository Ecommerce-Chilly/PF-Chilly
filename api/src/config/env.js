const DEFAULT_PORT = 3001;

function readEnvironment(environment = process.env) {
  const databaseUrl = environment.DB_DEPLOY?.trim();

  if (!databaseUrl) {
    throw new Error(
      'Missing DB_DEPLOY. Copy api/.env.example to api/.env and configure PostgreSQL.'
    );
  }

  const port = Number(environment.PORT || DEFAULT_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return {
    databaseUrl,
    port,
  };
}

module.exports = { DEFAULT_PORT, readEnvironment };
