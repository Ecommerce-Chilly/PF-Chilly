const { Order_items, User, Product } = require("../../db");

const postOrderItems = async (quantity) => {
    try {
        if (!userId || !productId || !quantity) throw new Error("You must fill all fields ");
        const foundUser = await User.findByPk(userId);//find the userId from the active User
        const foundProduct = await Product.findByPk(productId);
        const newOrderedItem = await Order_items.create({
            quantity,
        });
        await newOrderedItem.setUser(foundUser)
        await newOrderedItem.setProduct(foundProduct)


        return newOrderedItem


    } catch (error) {
        throw new Error(error)


    }
};

module.exports = postOrderItems;