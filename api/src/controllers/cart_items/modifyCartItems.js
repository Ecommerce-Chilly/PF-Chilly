const { Cart_items } = require("../../db");

const modifyQuantity = async (id, quantity) => {
  try {
    if (!id) throw "no id found";
    const cartItems = await Cart_items.findByPk(id);
    if (!cartItems) throw "no cart_items found";
    if (cartItems) cartItems.quantity = quantity;
    await cartItems.save();
    return cartItems;
  } catch (error) {
    throw error;
  }
};

module.exports = { modifyQuantity };
