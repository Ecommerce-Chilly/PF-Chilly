const { User, Product } = require("../../db");

const addFavorites = async (userId, productId) => {
  const user = await User.findByPk(userId)
  if (!user) throw `User does not exist`
  const product = await Product.findByPk(productId)
  if (!product) throw `Product does not exist`
  user.addProduct(product)
  return `Product added to favorites`
}

module.exports = { addFavorites };