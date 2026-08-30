const { expect } = require('chai');
const { hasPermission } = require('../src/middleware/permissions');

describe('Auth0 permissions', () => {
  it('accepts an administrative OAuth scope', () => {
    expect(
      hasPermission({ scope: 'openid profile admin:access' }, 'admin:access')
    ).to.equal(true);
  });

  it('accepts an administrative RBAC permission', () => {
    expect(
      hasPermission({ permissions: ['admin:access'] }, 'admin:access')
    ).to.equal(true);
  });

  it('rejects tokens without the administrative permission', () => {
    expect(
      hasPermission(
        { scope: 'openid profile', permissions: [] },
        'admin:access'
      )
    ).to.equal(false);
  });
});
