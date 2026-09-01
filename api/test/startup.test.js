const { expect } = require('chai');
const { EventEmitter } = require('node:events');
const {
  resetDemoSchema,
  seedDatabase,
  prepareDatabase,
} = require('../src/database/prepareDatabase');
const { createServerLifecycle } = require('../src/server');

async function expectRejection(operation, expectedError) {
  let caught;
  try {
    await operation();
  } catch (error) {
    caught = error;
  }
  expect(caught).to.equal(expectedError);
}

describe('Database preparation', () => {
  it('preserves the intentional destructive demo schema reset', async () => {
    let receivedOptions;
    await resetDemoSchema({ sync: async (options) => { receivedOptions = options; } });
    expect(receivedOptions).to.deep.equal({ force: true });
  });

  it('waits for categories before loading the catalog without resetting tables', async () => {
    const steps = [];
    await seedDatabase({
      loadCategories: async () => {
        await Promise.resolve();
        steps.push('categories');
      },
      loadCatalog: async () => { steps.push('catalog'); },
    });
    expect(steps).to.deep.equal(['categories', 'catalog']);
  });

  it('waits for reset, categories and catalog in that order', async () => {
    const steps = [];
    await prepareDatabase({
      connection: { sync: async () => {
        await Promise.resolve();
        steps.push('reset');
      } },
      loadCategories: async () => {
        await Promise.resolve();
        steps.push('categories');
      },
      loadCatalog: async () => { steps.push('catalog'); },
      demoMode: true,
      resetDbOnStart: true,
    });
    expect(steps).to.deep.equal(['reset', 'categories', 'catalog']);
  });

  it('preserves tables and skips the legacy seed by default', async () => {
    const steps = [];
    const result = await prepareDatabase({
      connection: { sync: async (options) => steps.push(['sync', options]) },
      loadCategories: async () => steps.push(['categories']),
      loadCatalog: async () => steps.push(['catalog']),
    });

    expect(steps).to.deep.equal([['sync', undefined]]);
    expect(result).to.deep.equal({ reset: false, seeded: false });
  });

  it('preserves tables in demo mode when reset is disabled', async () => {
    const steps = [];
    await prepareDatabase({
      connection: { sync: async (options) => steps.push(['sync', options]) },
      loadCategories: async () => steps.push(['categories']),
      loadCatalog: async () => steps.push(['catalog']),
      demoMode: true,
      resetDbOnStart: false,
    });

    expect(steps).to.deep.equal([['sync', undefined]]);
  });

  it('refuses a destructive reset outside demo mode before touching the database', async () => {
    const steps = [];
    const failure = await (async () => {
      try {
        await prepareDatabase({
          connection: { sync: async () => steps.push('sync') },
          loadCategories: async () => steps.push('categories'),
          loadCatalog: async () => steps.push('catalog'),
          demoMode: false,
          resetDbOnStart: true,
        });
      } catch (error) {
        return error;
      }
      return undefined;
    })();

    expect(failure).to.be.instanceOf(Error);
    expect(failure.message).to.include('outside demo mode');
    expect(steps).to.deep.equal([]);
  });

  for (const failedStage of ['reset', 'categories', 'catalog']) {
    it(`stops preparation and propagates a failure in ${failedStage}`, async () => {
      const steps = [];
      const failure = new Error(`${failedStage} failed`);
      const stage = (name) => async () => {
        steps.push(name);
        if (name === failedStage) throw failure;
      };
      await expectRejection(() => prepareDatabase({
        connection: { sync: stage('reset') },
        loadCategories: stage('categories'),
        loadCatalog: stage('catalog'),
        demoMode: true,
        resetDbOnStart: true,
      }), failure);
      const order = ['reset', 'categories', 'catalog'];
      expect(steps).to.deep.equal(order.slice(0, order.indexOf(failedStage) + 1));
    });
  }
});

describe('HTTP server lifecycle', () => {
  function setup({ preparationError, listenError, closeError } = {}) {
    const steps = [];
    const server = new EventEmitter();
    server.close = (callback) => {
      steps.push('close HTTP');
      callback(closeError);
    };
    const lifecycle = createServerLifecycle({
      port: 3001,
      prepareDatabase: async () => {
        await Promise.resolve();
        steps.push('prepare database');
        if (preparationError) throw preparationError;
      },
      app: { listen: (port, callback) => {
        expect(port).to.equal(3001);
        steps.push('listen');
        process.nextTick(() => {
          if (listenError) server.emit('error', listenError);
          else callback();
        });
        return server;
      } },
      connection: { close: async () => { steps.push('close database'); } },
    });
    return { ...lifecycle, steps, server };
  }

  it('does not prepare the database or listen when the lifecycle is constructed', () => {
    expect(setup().steps).to.deep.equal([]);
  });

  it('only listens after database preparation and returns the HTTP server', async () => {
    const lifecycle = setup();
    const starting = lifecycle.startServer();
    expect(lifecycle.steps).to.deep.equal([]);
    expect(await starting).to.equal(lifecycle.server);
    expect(lifecycle.steps).to.deep.equal(['prepare database', 'listen']);
  });

  it('never listens after failed database preparation', async () => {
    const failure = new Error('seed failed');
    const lifecycle = setup({ preparationError: failure });
    await expectRejection(lifecycle.startServer, failure);
    expect(lifecycle.steps).to.deep.equal(['prepare database']);
  });

  it('propagates listener errors to the entry point', async () => {
    const failure = new Error('address in use');
    const lifecycle = setup({ listenError: failure });
    await expectRejection(lifecycle.startServer, failure);
  });

  it('closes HTTP before closing the database', async () => {
    const lifecycle = setup();
    await lifecycle.startServer();
    await lifecycle.stopServer();
    expect(lifecycle.steps).to.deep.equal([
      'prepare database', 'listen', 'close HTTP', 'close database',
    ]);
  });

  it('closes the database even when HTTP shutdown fails', async () => {
    const failure = new Error('HTTP shutdown failed');
    const lifecycle = setup({ closeError: failure });
    await lifecycle.startServer();
    await expectRejection(lifecycle.stopServer, failure);
    expect(lifecycle.steps.slice(-2)).to.deep.equal(['close HTTP', 'close database']);
  });

  it('can close the database without a running HTTP listener', async () => {
    const lifecycle = setup();
    await lifecycle.stopServer();
    expect(lifecycle.steps).to.deep.equal(['close database']);
  });
});
