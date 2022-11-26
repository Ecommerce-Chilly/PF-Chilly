const { User, Product } = require("../db");

const getFavorites = async (userId) => {
  if (!user) throw `User does not exist`;
  const user = await User.findByPk(userId, {
    include: {
      model: Product,
      attributes: ['name', 'image'],
    }
  })
  return user
}

module.exports = { getFavorites }