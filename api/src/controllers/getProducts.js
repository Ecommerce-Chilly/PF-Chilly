const { Product, Inventory } = require("../db");
const { Op } = require("sequelize");
const getProducts = async (category, id, name) => {
  try {
    if (name) {
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
    }
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
    if (!category && !name && !id) {
      const all = await Product.findAll({
        include: {
          model: Inventory,
          attributes: ["quantity"],
          no,
        },
      });
      if (all.length === 0)
        throw new Error("Dont have products in our data base");
      return all;
    }
    if (category && !name && !id) {
      const prodGet = await Product.findAll({
        where: { categoryName: category },
        include: {
          model: Inventory,
          attributes: ["quantity"],
        },
      });
      return prodGet;
    }
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { getProducts };
