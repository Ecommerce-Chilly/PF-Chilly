const { Cart, Cart_items } = require('../../db');

const getCart = async ({ id }) => {
  try {
    if (!id) throw 'no Id found';
    const CartById = await Cart.findByPk(id, {
      include: {
        model: Cart_items,
      },
    });
    return CartById;
  } catch (error) {
    throw error;
  }
};

module.exports = { getCart };
