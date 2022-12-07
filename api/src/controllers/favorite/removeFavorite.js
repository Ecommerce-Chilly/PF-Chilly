const { User, Product } = require("../../db");

const removeFavorites = async (userId, productId) => {
  const user = await User.findByPk(userId)
  if (!user) throw `User does not exist`
  const product = await Product.findByPk(productId)
  if (!product) throw `Product does not exist`
  user.removeProduct(product)
  return `Product removed from favorites`
}

module.exports = { removeFavorites };