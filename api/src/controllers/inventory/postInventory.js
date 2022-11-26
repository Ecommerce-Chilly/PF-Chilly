const { Inventory } = require("../../db");

const postInventory = async (quantity) => {
  if (!quantity) throw ("Send a quantity of products");
  try {
    const invCreate = await Inventory.create({
      quantity,
    });
    return invCreate;
  } catch (error) {
    throw (error);
  }
};

module.exports = postInventory;
