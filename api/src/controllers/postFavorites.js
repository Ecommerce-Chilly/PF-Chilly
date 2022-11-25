const { Favorite, User, Product } = require("../db");

const postFavorite = async ({
   userId,
   productId
}) => {
   try {
      if (!userId || !productId) {
         throw new Error("Sending incomplete information!");
      } else {
         const foundUser = await User.findByPk(userId);//find the userId from the active User
         const foundProduct = await Product.findByPk(productId);
         if (!foundUser || !foundProduct) return "product and user not found"
         const newFavorite = await Favorite.create({});
         await newFavorite.setUser(foundUser)
         await newFavorite.setProduct(foundProduct)

         return newFavorite
      }

   } catch (error) {
      throw new Error(error)


   }
}

module.exports = postFavorite

