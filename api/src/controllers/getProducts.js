const { Product, Inventory } = require("../db");

const getProducts = async (category, id) => {
  try {
    if (id) {
      const product = await Product.findByPk(id, {
        include: {
          model: Inventory,
          attributes: ["quantity"],
        },
      });
      if (!product) throw new Error(`Product with id ${id} is not exist`);
      return product;
    }
    if (!category) {
      const all = await Product.findAll({
        include: {
          model: Inventory,
          attributes: ["quantity"],
        },
      });
      return all;
    }
    const prodGet = await Product.findAll({
      where: { categoryName: category },
      include: {
        model: Inventory,
        attributes: ["quantity"],
      },
    });
    return prodGet;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { getProducts };