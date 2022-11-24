const { Favorite, User, Product } = require("../db");

const postFavorite = async ({
    userId,
    productId
}) => {
    try {
        if (!userId || !productId) {
            throw new Error("fields not found");
        } else {
            const findUserId = await User.findOne({ where: { id: userId } });//find the userId from the active User
            const findProductId = await Product.findOne({ where: { id: productId } });
            const newFavorite = await Favorite.create({});
            await newFavorite.setUser(findUserId)
            await newFavorite.setProduct(findProductId)

            return newFavorite
        }

    } catch (error) {
        throw new Error(error)


    }
}

module.exports = postFavorite

