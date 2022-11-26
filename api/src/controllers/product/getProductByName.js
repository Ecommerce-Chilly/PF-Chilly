const { Product, Inventory } = require("../../db");

const getProductByName = async (name) => {
  if (!name || "") {
    try {
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = { getProductByName };
