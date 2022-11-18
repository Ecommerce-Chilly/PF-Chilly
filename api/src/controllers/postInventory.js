const { Inventory } = require("../db");

const postInvetory = async (quantity) => {
  if (!quantity) throw new Error("Send a quantity of products");
  try {
    const invCreate = await Inventory.create({
      quantity,
    });
    return invCreate;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = postInvetory;
