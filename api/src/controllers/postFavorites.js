const { Favorite, User, Product } = require("../db");

const postFavorite = async ({ userId, productId }) => {
   try {
      if (!userId || !productId) {
         console.log("userId" + userId);
         throw new Error("fields not found");
      } else {
         userId = Number(userId);
         console.log("number userId" + userId);
         productId = Number(productId);
         const findUserId = await User.findByPk(userId);
         console.log(findUserId);
         //find the userId from the active User
         const findProductId = await Product.findByPk(productId);
         const newFavorite = await Favorite.create({
            userId: findUserId.dataValues.id,
            productId: findProductId.dataValues.id,
         });
         return newFavorite;
      }
   } catch (error) {
      throw new Error(error);
   }
};

module.exports = postFavorite;
