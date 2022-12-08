const { Cart, Product } = require("../../db");

const addProduct = async ({ cartId, productId }) => {
  try {
    const cart = await Cart.findByPk(cartId);
    if (!cart)
      throw (`The Cart with the id ${cartId} doesn't exist`);
    const product = await Product.findByPk(productId)
    cart.products = [...cart.products, product]
    await cart.save()
    return cart
  } catch (error) {
    throw (error);
  }
};

module.exports = { addProduct };

