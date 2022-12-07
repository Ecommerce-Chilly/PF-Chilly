const { User, Product } = require("../../db");

const getFavorites = async (userId) => {
  const user = await User.findByPk(userId, {
    include: {
      model: Product,
      attributes: ["name", "image", "id"],
    },
  });
  if (!user) throw `User does not exist`;
  return user;
};

module.exports = { getFavorites };