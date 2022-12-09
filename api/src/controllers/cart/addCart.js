const { Cart, User } = require('../../db')
const addCart = async (userId) => {
  try {
    if (!userId) throw (" no user found ");
    const foundUser = await User.findByPk(userId);
    const cart = await Cart.create();
    await cart.setUser(foundUser)
    return cart
  } catch (error) {
    throw (error)
  }
}

module.exports = { addCart }