const { Product, Inventory } = require("../../db");
const { Op } = require("sequelize");
require("dotenv").config();

const getProducts = async (category, id, name) => {
  try {
    if (!category && name && !id) {
      const productName = await Product.findAll({
        // Juanra hizo el Op.like
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: {
          model: Inventory,
          attributes: ["quantity"],
        },
      });
      if (productName.length === 0)
        throw `Product with name ${name} does not exist`;
      return productName;
    }
    if (!category && !name && id) {
      const product = await Product.findByPk(id, {
        include: {
          model: Inventory,
          attributes: ["quantity"],
        },
      });
      if (!product) throw `Product with id ${id} does not exist`;
      return product;
    }
    if (!category && !name && !id) {
      const all = await Product.findAll({
        include: {
          model: Inventory,
          attributes: ["quantity"],
        },
      });
      if (all.length === 0) throw "Dont have products in our data base";
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
    throw error;
  }
};
const getProductsDeleted = async () => {
  try {
    const products = await Product.findAll({
      where: { deletedAt: { [Op.not]: null } },
      include: {
        model: Inventory,
        attributes: ["quantity"],
      },
      paranoid: false,
    });
    if (products.length === 0) throw `No products removed`;
    return products;
  } catch (error) {
    throw error;
  }
};
module.exports = { getProducts, getProductsDeleted };
