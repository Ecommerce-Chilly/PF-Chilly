const { Cart_items, Cart, Product } = require('../../db');

const deleteItem = async (req) => {
  try {
    const { cartId, productId } = req.params;

    const foundCartId = await Cart.findByPk(cartId);
    if (!foundCartId) {
      throw `The item with the id ${id} doesn't exist`;
    }
    await Cart_items.destroy({
      where: { cartId: cartId, productId: productId },
    });
    return 'Item deleted';
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteItem };
