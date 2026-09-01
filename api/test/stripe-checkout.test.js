const { expect } = require('chai');
const {
  CheckoutError,
  StripeCheckoutService,
  getUnitAmount,
  normalizeCartItems,
} = require('../src/services/stripeCheckout');

describe('Stripe Checkout', () => {
  it('normalizes duplicate cart items without accepting client prices', () => {
    expect(
      normalizeCartItems([
        { id: 7, quantity: 2, price: 0.01 },
        { id: '7', quantity: 3, price: 999999 },
      ])
    ).to.deep.equal([{ id: 7, quantity: 5 }]);
  });

  it('rejects invalid quantities', () => {
    expect(() => normalizeCartItems([{ id: 1, quantity: 0 }])).to.throw(
      CheckoutError,
      'quantities must be integers'
    );
  });

  it('converts database prices to Stripe minor units', () => {
    expect(getUnitAmount(189.99)).to.equal(18999);
  });

  it('creates line items from database products', async () => {
    let stripePayload;
    const service = new StripeCheckoutService({
      stripe: {
        checkout: {
          sessions: {
            create: async (payload) => {
              stripePayload = payload;
              return { id: 'cs_test_123', url: 'https://checkout.stripe.test/123' };
            },
          },
        },
      },
      models: {
        User: {
          findOne: async () => ({ id: 4, email: 'buyer@example.com' }),
        },
        Product: {
          findAll: async () => [
            {
              id: 7,
              name: 'Database product',
              price: 42.5,
              inventory: { quantity: 10 },
            },
          ],
        },
        Inventory: {},
      },
      storefrontUrl: 'http://localhost:3000/PF-Chilly/',
    });

    const result = await service.createSession({
      items: [{ id: 7, quantity: 2, price: 0.01 }],
      auth0Subject: 'google-oauth2|123',
    });

    expect(result.url).to.equal('https://checkout.stripe.test/123');
    expect(stripePayload.line_items[0].price_data.unit_amount).to.equal(4250);
    expect(stripePayload.line_items[0].quantity).to.equal(2);
    expect(stripePayload.metadata.cart).to.equal('[{"id":7,"quantity":2}]');
  });

  it('does not create orders for an unpaid session', async () => {
    const service = new StripeCheckoutService({
      stripe: {
        checkout: {
          sessions: {
            retrieve: async () => ({
              id: 'cs_test_123',
              payment_status: 'unpaid',
              metadata: { auth0Subject: 'auth0|123' },
            }),
          },
        },
      },
      models: {},
      storefrontUrl: 'http://localhost/',
    });

    try {
      await service.confirmSession({
        sessionId: 'cs_test_123',
        auth0Subject: 'auth0|123',
      });
      throw new Error('Expected confirmSession to reject an unpaid session.');
    } catch (error) {
      expect(error).to.be.instanceOf(CheckoutError);
      expect(error.status).to.equal(409);
    }
  });

  it('creates orders and clears the backend cart after verified payment', async () => {
    const createdOrders = [];
    let clearedCartId;
    const service = new StripeCheckoutService({
      stripe: {
        checkout: {
          sessions: {
            retrieve: async () => ({
              id: 'cs_test_paid',
              client_reference_id: '4',
              payment_status: 'paid',
              metadata: {
                auth0Subject: 'auth0|123',
                cart: '[{"id":7,"quantity":2}]',
              },
            }),
          },
        },
      },
      models: {
        User: { findOne: async () => ({ id: 4 }) },
        Order_items: {
          findOne: async () => null,
          create: async (order) => createdOrders.push(order),
        },
        Cart: { findOne: async () => ({ id: 9 }) },
        Cart_items: {
          destroy: async ({ where }) => {
            clearedCartId = where.cartId;
          },
        },
        conn: { transaction: async (callback) => callback({}) },
      },
      storefrontUrl: 'http://localhost/',
    });

    const result = await service.confirmSession({
      sessionId: 'cs_test_paid',
      auth0Subject: 'auth0|123',
    });

    expect(result).to.deep.equal({ paid: true, alreadyProcessed: false });
    expect(createdOrders).to.deep.equal([
      {
        quantity: 2,
        checkoutSessionId: 'cs_test_paid',
        userId: 4,
        productId: 7,
      },
    ]);
    expect(clearedCartId).to.equal(9);
  });
});
