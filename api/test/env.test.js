const { expect } = require('chai');
const { DEFAULT_PORT, readEnvironment } = require('../src/config/env');

const validEnvironment = {
  DB_DEPLOY: 'postgresql://local/chilly',
  AUTH0_AUDIENCE: 'https://chilly-api',
  AUTH0_ISSUER_BASE_URL: 'https://example.us.auth0.com',
};

describe('API environment', () => {
  it('requires a PostgreSQL connection URL', () => {
    expect(() => readEnvironment({})).to.throw('Missing DB_DEPLOY');
  });

  it('uses the default port when PORT is not provided', () => {
    const config = readEnvironment(validEnvironment);

    expect(config.port).to.equal(DEFAULT_PORT);
  });

  it('rejects an invalid port', () => {
    expect(() =>
      readEnvironment({ ...validEnvironment, PORT: 'nope' })
    ).to.throw('PORT must be an integer');
  });

  it('requires the Auth0 audience and issuer', () => {
    expect(() =>
      readEnvironment({ DB_DEPLOY: 'postgresql://local/chilly' })
    ).to.throw('Missing Auth0 API configuration');
  });

  it('normalizes the Auth0 issuer and defaults the admin scope', () => {
    const config = readEnvironment(validEnvironment);

    expect(config.auth0IssuerBaseUrl).to.equal(
      'https://example.us.auth0.com/'
    );
    expect(config.auth0AdminScope).to.equal('admin:access');
  });
});
