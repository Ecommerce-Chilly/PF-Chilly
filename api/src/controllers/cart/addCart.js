const { Cart, User } = require('../../db')
const { UniqueConstraintError } = require("sequelize")

const addCart = async ({ userId }) => {
  if (userId === null) throw (" no user found ");
  try {
    const foundUser = await User.findByPk(userId);
    const cart = await Cart.create();
    await cart.setUser(foundUser)
    return cart
  } catch (error) {
    if (UniqueConstraintError) throw ({ msg: "This UserId is already in use" })
    throw error
  }
}

module.exports = { addCart }