const { Shopping_session, User } = require("../../db")

const addShoppingSession = async (userId) => {
  const shopping = await Shopping_session.create({ total: 1, status: "Pending" })
  const user = await User.findOne({ where: { id: userId } })
  await user.setShopping_session(shopping)
  await shopping.setUser(user)
  return shopping
}
module.exports = { addShoppingSession }