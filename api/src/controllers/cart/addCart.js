const { Cart, User, Product } = require('../../db')
const addCart = async ({ userId, productId, quantity }) => {
  try {
    if (!userId || !productId || !quantity) throw ("You must fill all fields ");
    const foundUser = await User.findByPk(userId);
    const product = await Product.findByPk(productId);
    const cart = await Cart.create({
      quantity,
      products: [product]
    });
    await cart.setUser(foundUser)
    await foundUser.setCart(cart)
    return cart
  } catch (error) {
    throw (error)
  }
}

module.exports = { addCart }