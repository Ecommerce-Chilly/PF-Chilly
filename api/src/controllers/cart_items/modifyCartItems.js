const { Cart_items } = require('../../db');

const modifyQuantity = async (cartId, productId, quantity) => {
  try {
    if (!cartId || !productId) {
      throw 'no cartId or productId found';
    }

    await Cart_items.update(
      { quantity: quantity },
      { where: { cartId: cartId, productId: productId } }
    );
    return 'Quantity updated';
  } catch (error) {
    console.log(error);
  }
};

module.exports = { modifyQuantity };
