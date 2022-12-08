const { Cart } = require("../../db");

const removeProductCart = async ({ cartId, productId }) => {
  try {
    const cart = await Cart.findByPk(cartId);
    if (!cart)
      throw (`The Cart with the id ${cartId} doesn't exist`);
    const id = cart.products.findIndex(e => e.id === productId)
    // const products = cart.products.slice(id)
    console.log(id);
    const products = cart.products.map((e, index) => {
      if (index === id) return
      return e
    })
    console.log(products);
    cart.save()
    return `The product with id ${productId} was deleted of your cart`;
  } catch (error) {
    throw (error);
  }
};
module.exports = { removeProductCart };

