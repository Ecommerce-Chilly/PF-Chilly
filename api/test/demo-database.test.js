const { expect } = require('chai');
const {
  buildCatalogRecords,
  missingCatalogRecords,
} = require('../src/controllers/hardCode');
const {
  acquireDemoLock,
  cleanMutableDemoData,
} = require('../src/database/demoMaintenance');

describe('Demo database maintenance', () => {
  it('builds all legacy catalog entries without treating repeated names as duplicates', () => {
    const records = buildCatalogRecords();
    expect(records).to.have.length(550);
    expect(new Set(records.map((record) => record.name)).size).to.equal(543);
  });

  it('does not recreate products already represented in the catalog', () => {
    const records = buildCatalogRecords();
    expect(missingCatalogRecords(records, records)).to.deep.equal([]);
    expect(missingCatalogRecords(records, records.slice(0, 12))).to.have.length(538);
  });

  it('refuses concurrent maintenance when the PostgreSQL lock is occupied', async () => {
    let caught;
    try {
      await acquireDemoLock(
        { query: async () => [[{ acquired: false }]] },
        'transaction'
      );
    } catch (error) {
      caught = error;
    }
    expect(caught).to.be.instanceOf(Error);
    expect(caught.message).to.include('already running');
  });

  it('cleans mutable records in a transaction while leaving catalog models untouched', async () => {
    const operations = [];
    const destroyModel = (name) => ({
      destroy: async () => operations.push(name),
    });
    const models = {
      Cart: destroyModel('carts'),
      Cart_items: destroyModel('cart items'),
      Data_user: destroyModel('user data'),
      Order_details: destroyModel('order details'),
      Order_items: destroyModel('order items'),
      Shopping_session: {
        update: async () => operations.push('unlink shopping sessions'),
        destroy: async () => operations.push('shopping sessions'),
      },
      User: {
        update: async () => operations.push('unlink users'),
        destroy: async () => operations.push('users'),
      },
      favorites: destroyModel('favorites'),
      Product: { destroy: async () => operations.push('products') },
    };
    const connection = {
      transaction: async (operation) => operation('transaction'),
      query: async () => [[{ acquired: true }]],
      connectionManager: {
        getConnection: async () => 'lock connection',
        releaseConnection: () => {},
      },
    };

    await cleanMutableDemoData({ connection, models });

    expect(operations).to.deep.equal([
      'unlink users',
      'unlink shopping sessions',
      'favorites',
      'cart items',
      'order items',
      'order details',
      'carts',
      'user data',
      'shopping sessions',
      'users',
    ]);
    expect(operations).not.to.include('products');
  });
});
