const { User, Product } = require("../../db");

const addFavorites = async (userId, productId) => {
   const user = await User.findOne({ where: { userId: userId } });
   if (!user) throw `User does not exist`;
   const product = await Product.findOne({ where: { productId: productId } });
   if (!product) throw `Product does not exist`;
   user.addProduct(product);
   return `Product add to favorites`;
};

module.exports = { addFavorites };
