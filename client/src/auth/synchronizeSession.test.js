import { synchronizeAuthenticatedUser } from './synchronizeSession';

const user = {
  email: 'admin@example.com',
  name: 'Admin',
  picture: 'https://example.com/avatar.png',
};

function setup(overrides = {}) {
  const calls = [];
  const storage = {
    values: {},
    setItem(key, value) {
      this.values[key] = value;
    },
  };
  const actions = {
    createUser: (body, token) => ({ operation: 'createUser', body, token }),
    userSpecific: (email, token) => ({ operation: 'userSpecific', email, token }),
    userAdmin: (email, token) => ({ operation: 'userAdmin', email, token }),
  };
  const results = overrides.results || {
    createUser: { type: 'CREATE_USER' },
    userSpecific: { type: 'USER_SPECIFIC' },
    userAdmin: { type: 'USER_ADMIN', payload: true },
  };
  const dispatch = async (action) => {
    calls.push(action.operation);
    const result = results[action.operation];
    return Array.isArray(result) ? result.shift() : result;
  };

  return {
    calls,
    storage,
    options: {
      dispatch,
      getAccessToken: async () => 'access-token',
      user,
      storage,
      actions,
      wait: async () => calls.push('wait'),
      retryDelay: 0,
      ...overrides.options,
    },
  };
}

test('synchronizes the local user before checking the administrative role', async () => {
  const context = setup();

  await expect(
    synchronizeAuthenticatedUser(context.options)
  ).resolves.toBe(true);

  expect(context.calls).toEqual(['createUser', 'userSpecific', 'userAdmin']);
  expect(JSON.parse(context.storage.values.email)).toBe(user.email);
  expect(JSON.parse(context.storage.values.token)).toBe('access-token');
});

test('accepts a regular user without retrying the administrative check', async () => {
  const context = setup({
    results: {
      createUser: { type: 'CREATE_USER' },
      userSpecific: { type: 'USER_SPECIFIC' },
      userAdmin: { type: 'USER_ADMIN', payload: false },
    },
  });

  await synchronizeAuthenticatedUser(context.options);

  expect(context.calls).toEqual(['createUser', 'userSpecific', 'userAdmin']);
});

test('retries when the API is not ready to create the local user', async () => {
  const context = setup({
    results: {
      createUser: [{ type: 'ERROR_CREATE_USER' }, { type: 'CREATE_USER' }],
      userSpecific: { type: 'USER_SPECIFIC' },
      userAdmin: { type: 'USER_ADMIN', payload: true },
    },
  });

  await synchronizeAuthenticatedUser(context.options);

  expect(context.calls).toEqual([
    'createUser',
    'wait',
    'createUser',
    'userSpecific',
    'userAdmin',
  ]);
});

test('does not report the session as ready after exhausting API retries', async () => {
  const context = setup({
    results: {
      createUser: { type: 'ERROR_CREATE_USER' },
      userSpecific: { type: 'USER_SPECIFIC' },
      userAdmin: { type: 'USER_ADMIN', payload: true },
    },
    options: { attempts: 2 },
  });

  await expect(
    synchronizeAuthenticatedUser(context.options)
  ).rejects.toThrow('could not synchronize');

  expect(context.calls).toEqual(['createUser', 'wait', 'createUser']);
  expect(context.storage.values).toEqual({});
});
