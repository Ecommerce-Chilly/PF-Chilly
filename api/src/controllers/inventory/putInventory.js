const { Inventory } = require("../../db");

const putInventory = async (id, quantity) => {
  try {
    if (!id) throw ("Send all data");
    const invFound = await Inventory.findByPk(id);
    if (!invFound) throw ("Inventory not found");
    if (quantity) invFound.quantity = quantity;
    if (!quantity) invFound.quantity -= 1;
    await invFound.save();
    return invFound;
  } catch (error) {
    throw (error);
  }
};
module.exports = { putInventory };
