const { Inventory } = require("../db");

const putInventory = async (id, number) => {
  const invFound = Inventory.findByPk(id);
  if (!id) throw new Error("Send a id");
  if (!invFound) throw new Error("Inventory not found");
  if (number) {
    const modifed = await Inventory.update(
      { quantity: number },
      { where: { id: id } }
    );
    return modifed;
  }
  const modifed = await Inventory.update(
    { quantity: invFound.quantity - 1 },
    { where: { id: id } }
  );
  return modifed;
};
module.exports = putInventory;
