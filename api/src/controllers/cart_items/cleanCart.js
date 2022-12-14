const { Cart_items, Cart } = require('../../db');

const cleanCart = async (userId) => {
  const foundCart = await Cart.findOne({ where: { userId: userId } });
  const cleanedCart = await Cart_items.destroy({
    where: { cartId: foundCart.id },
  });
  return 'Cart successfully cleaned';
};

module.exports = { cleanCart };
