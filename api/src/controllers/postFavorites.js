const { Favorite, User, Product } = require("../db");

const postFavorite = async ({ userId, productId }) => {
   try {
      if (!userId || !productId) {
         throw new Error("fields not found");
      } else {
         // userId = Number(userId);
         // productId = Number(productId);
         const findUserId = await User.findByPk(userId);
         //find the userId from the active User
         const findProductId = await Product.findByPk(productId);

         const newFavorite = await Favorite.create({});
         await newFavorite.setUser(findUserId);
         await newFavorite.setProduct(findProductId);

         return newFavorite;
      }
   } catch (error) {
      throw new Error(error);
   }
};

module.exports = postFavorite;
