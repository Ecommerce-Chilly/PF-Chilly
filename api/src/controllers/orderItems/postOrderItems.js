const { Order_items, User, Product } = require("../../db");

const postOrderItems = async ({ userId, productId, quantity }) => {
  try {
    if (!userId || !productId || !quantity) throw new Error("You must fill all fields ");
    const foundUser = await User.findByPk(userId);
    const foundProduct = await Product.findByPk(productId);
    const newOrderedItem = await Order_items.create({
      quantity,
    });
    await newOrderedItem.setUser(foundUser)
    await newOrderedItem.setProduct(foundProduct)

    return 'Order added'


  } catch (error) {
    throw new Error(error)
  }
};

module.exports = postOrderItems;