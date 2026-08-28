const { expect } = require('chai');
const { DEFAULT_PORT, readEnvironment } = require('../src/config/env');

describe('API environment', () => {
  it('requires a PostgreSQL connection URL', () => {
    expect(() => readEnvironment({})).to.throw('Missing DB_DEPLOY');
  });

  it('uses the default port when PORT is not provided', () => {
    const config = readEnvironment({ DB_DEPLOY: 'postgresql://local/chilly' });

    expect(config.port).to.equal(DEFAULT_PORT);
  });

  it('rejects an invalid port', () => {
    expect(() =>
      readEnvironment({ DB_DEPLOY: 'postgresql://local/chilly', PORT: 'nope' })
    ).to.throw('PORT must be an integer');
  });
});
