const { expect } = require('chai');
const { DEFAULT_PORT, readEnvironment } = require('../src/config/env');

const validEnvironment = {
  DB_DEPLOY: 'postgresql://local/chilly',
  AUTH0_AUDIENCE: 'https://chilly-api',
  AUTH0_ISSUER_BASE_URL: 'https://example.us.auth0.com',
  STRIPE_SECRET_KEY: 'sk_test_example',
  STOREFRONT_URL: 'http://localhost:3000/PF-Chilly/',
};

describe('API environment', () => {
  it('requires a PostgreSQL connection URL', () => {
    expect(() => readEnvironment({})).to.throw('Missing DB_DEPLOY');
  });

  it('uses the default port when PORT is not provided', () => {
    const config = readEnvironment(validEnvironment);

    expect(config.port).to.equal(DEFAULT_PORT);
  });

  it('uses a persistent non-destructive database policy by default', () => {
    const config = readEnvironment(validEnvironment);

    expect(config.demoMode).to.equal(false);
    expect(config.resetDbOnStart).to.equal(false);
  });

  it('accepts an explicit destructive demo policy', () => {
    const config = readEnvironment({
      ...validEnvironment,
      DEMO_MODE: 'true',
      RESET_DB_ON_START: 'true',
    });

    expect(config.demoMode).to.equal(true);
    expect(config.resetDbOnStart).to.equal(true);
  });

  it('rejects malformed boolean configuration', () => {
    expect(() =>
      readEnvironment({ ...validEnvironment, DEMO_MODE: 'yes' })
    ).to.throw('DEMO_MODE must be either true or false');
  });

  it('rejects destructive reset outside demo mode', () => {
    expect(() =>
      readEnvironment({
        ...validEnvironment,
        DEMO_MODE: 'false',
        RESET_DB_ON_START: 'true',
      })
    ).to.throw('only allowed when DEMO_MODE=true');
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

  it('requires a Stripe test key', () => {
    expect(() =>
      readEnvironment({ ...validEnvironment, STRIPE_SECRET_KEY: 'sk_live_nope' })
    ).to.throw('Missing Stripe test configuration');
  });

  it('normalizes the storefront URL', () => {
    const config = readEnvironment(validEnvironment);

    expect(config.storefrontUrl).to.equal(
      'http://localhost:3000/PF-Chilly/'
    );
  });
});
