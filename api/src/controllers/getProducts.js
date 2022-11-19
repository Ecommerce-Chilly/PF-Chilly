const { Product } = require("../db");

const getProducts = async ({ category }) => {
  console.log(category);
  try {
    if (!category) {
      const all = await Product.findAll();
      return all;
    }
    const prodGet = await Product.findAll({
      where: { categoryName: category },
    });
    return prodGet;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { getProducts };
