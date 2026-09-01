class CheckoutError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'CheckoutError';
    this.status = status;
  }
}

function normalizeCartItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new CheckoutError('The cart cannot be empty.');
  }

  const quantities = new Map();

  for (const item of items) {
    const productId = Number(item?.id);
    const quantity = Number(item?.quantity);

    if (!Number.isInteger(productId) || productId < 1) {
      throw new CheckoutError('Every cart item must have a valid product id.');
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new CheckoutError('Product quantities must be integers from 1 to 99.');
    }

    quantities.set(productId, (quantities.get(productId) || 0) + quantity);
  }

  const normalizedItems = [...quantities].map(([id, quantity]) => ({
    id,
    quantity,
  }));

  if (normalizedItems.some((item) => item.quantity > 99)) {
    throw new CheckoutError('A product quantity cannot exceed 99.');
  }
  if (normalizedItems.length > 20) {
    throw new CheckoutError('A checkout cannot contain more than 20 products.');
  }

  return normalizedItems;
}

function getUnitAmount(price) {
  const unitAmount = Math.round(Number(price) * 100);
  if (!Number.isSafeInteger(unitAmount) || unitAmount < 1) {
    throw new CheckoutError('A product has an invalid price.');
  }
  return unitAmount;
}

class StripeCheckoutService {
  constructor({ stripe, models, storefrontUrl }) {
    this.stripe = stripe;
    this.models = models;
    this.storefrontUrl = storefrontUrl;
  }

  async createSession({ items, auth0Subject }) {
    const normalizedItems = normalizeCartItems(items);
    const user = await this.models.User.findOne({
      where: { auth0Sub: auth0Subject },
    });

    if (!user) {
      throw new CheckoutError('The authenticated user is not synchronized.', 404);
    }

    const products = await this.models.Product.findAll({
      where: { id: normalizedItems.map((item) => item.id) },
      include: {
        model: this.models.Inventory,
        attributes: ['quantity'],
      },
    });
    const productsById = new Map(products.map((product) => [product.id, product]));

    if (productsById.size !== normalizedItems.length) {
      throw new CheckoutError('One or more products no longer exist.');
    }

    const lineItems = normalizedItems.map((item) => {
      const product = productsById.get(item.id);
      const inventoryQuantity = Number(product.inventory?.quantity);

      if (!Number.isFinite(inventoryQuantity) || inventoryQuantity < item.quantity) {
        throw new CheckoutError(`${product.name} does not have enough stock.`);
      }

      return {
        quantity: item.quantity,
        price_data: {
          currency: 'eur',
          unit_amount: getUnitAmount(product.price),
          product_data: {
            name: product.name,
            metadata: { productId: String(product.id) },
          },
        },
      };
    });

    const serializedCart = JSON.stringify(normalizedItems);
    if (serializedCart.length > 500) {
      throw new CheckoutError('The cart is too large for a checkout session.');
    }

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      client_reference_id: String(user.id),
      customer_email: user.email,
      line_items: lineItems,
      success_url: `${this.storefrontUrl}paymentsuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.storefrontUrl}paymentfailure`,
      metadata: {
        auth0Subject,
        cart: serializedCart,
      },
    });

    return { id: session.id, url: session.url };
  }

  async confirmSession({ sessionId, auth0Subject }) {
    if (!/^cs_(test|live)_/.test(sessionId || '')) {
      throw new CheckoutError('Invalid checkout session.');
    }

    const session = await this.stripe.checkout.sessions.retrieve(sessionId);

    if (session.metadata?.auth0Subject !== auth0Subject) {
      throw new CheckoutError('This checkout belongs to another user.', 403);
    }
    if (session.payment_status !== 'paid') {
      throw new CheckoutError('The payment has not been completed.', 409);
    }

    const user = await this.models.User.findOne({
      where: {
        id: Number(session.client_reference_id),
        auth0Sub: auth0Subject,
      },
    });
    if (!user) {
      throw new CheckoutError('The checkout user no longer exists.', 404);
    }

    const existingOrder = await this.models.Order_items.findOne({
      where: { checkoutSessionId: session.id },
    });
    if (existingOrder) {
      return { paid: true, alreadyProcessed: true };
    }

    let purchasedItems;
    try {
      purchasedItems = normalizeCartItems(JSON.parse(session.metadata.cart));
    } catch {
      throw new CheckoutError('The checkout session has invalid order data.', 500);
    }

    await this.models.conn.transaction(async (transaction) => {
      for (const item of purchasedItems) {
        await this.models.Order_items.create(
          {
            quantity: item.quantity,
            checkoutSessionId: session.id,
            userId: user.id,
            productId: item.id,
          },
          { transaction }
        );
      }

      const cart = await this.models.Cart.findOne({
        where: { userId: user.id },
        transaction,
      });
      if (cart) {
        await this.models.Cart_items.destroy({
          where: { cartId: cart.id },
          transaction,
        });
      }
    });

    return { paid: true, alreadyProcessed: false };
  }
}

module.exports = {
  CheckoutError,
  StripeCheckoutService,
  getUnitAmount,
  normalizeCartItems,
};
