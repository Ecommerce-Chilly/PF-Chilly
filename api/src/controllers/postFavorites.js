const { Favorite, User, Product } = require("../db");

const postFavorite = async ({ userId, productId }) => {
   try {
      if (!userId || !productId) {
         throw new Error("fields not found");
      } else {
         const findUserId = await User.findByPk(userId);
         console.log("soy findUserId" + findUserId); //find the userId from the active User
         const findProductId = await Product.findByPk(productId);
         const newFavorite = await Favorite.create({
            where: { userId: findUserId, productId: findProductId },
         });
         return newFavorite;
      }
   } catch (error) {
      throw new Error(error);
   }
};

module.exports = postFavorite;
