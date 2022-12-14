const { UniqueConstraintError } = require('sequelize');
const { Cart_items, Cart, Product } = require('../../db');

const postCartItems = async ({ quantity, cartId, productId }) => {
  try {
    if (!quantity || !cartId || !productId) throw ' you must fill all fields ';
    const foundProduct = await Product.findByPk(productId);
    const foundCart = await Cart.findByPk(cartId);
    const cart_items = await Cart_items.create({ quantity });
    await cart_items.setProduct(foundProduct);
    await cart_items.setCart(foundCart);
    return 'Item added';
  } catch (error) {
    if (UniqueConstraintError)
      throw { msg: 'items in the cart, to update use Put' };
    throw error;
  }
};

module.exports = { postCartItems };
