const { Product, Inventory } = require("../db");
const { Op } = require("sequelize");
const getProducts = async (category, id, name) => {
  try {
    if (name && !category && !id) {
      const productName = await Product.findAll({
        // Juanra hizo el Op.like
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: {
          model: Inventory,
          attributes: ["quantity"],
        },
      });
      if (productName.length === 0)
        throw new Error(`Product with name ${name} is not exist`);
      return productName;
    } else if (id && !category && !name) {
      const product = await Product.findByPk(id, {
        include: {
          model: Inventory,
          attributes: ["quantity"],
        },
      });
      if (!product) throw new Error(`Product with id ${id} does not exist`);
      return product;
    } else if (category && !name && !id) {
      const prodGet = await Product.findAll({
        where: { categoryName: category },
        include: {
          model: Inventory,
          attributes: ["quantity"],
        },
      });
      return prodGet;
    } else {
      const all = await Product.findAll({
        include: {
          model: Inventory,
          attributes: ["quantity"],
        },
      });
      if (all.length === 0)
        throw new Error("Dont have products in our data base");
      return all;
    }
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { getProducts };
