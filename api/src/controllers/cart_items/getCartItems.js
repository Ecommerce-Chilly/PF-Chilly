const { Cart, Cart_items } = require('../../db');

const getCart_items = async ({ id }) => {
  try {
    if (!id) throw 'no Id found';
    const CartById = await Cart.findByPk(id, {
      include: {
        model: Cart_items,
        attributes: ['cartId', 'productId', 'quantity'],
      },
    });
    return CartById;
  } catch (error) {
    throw error;
  }
};

module.exports = { getCart_items };
