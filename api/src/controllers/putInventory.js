const { Inventory } = require("../db");

const putInventory = async ({ id }, { quantity }) => {
  try {
    if (!id) throw new Error("Send all data");
    const invFound = Inventory.findByPk(id);
    if (!invFound) throw new Error("Inventory not found");
    if (quantity) invFound.quantity = quantity;
    if (!quantity) invFound.quantity -= 1;
    await invFound.save();
    return invFound;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { putInventory };
