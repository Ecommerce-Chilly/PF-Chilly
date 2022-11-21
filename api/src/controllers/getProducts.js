<<<<<<< HEAD
const { Product } = require("../db");

const getProducts = async ({ category }) => {
  console.log(category);
  try {
    if (!category) {
      const all = await Product.findAll();
=======
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
>>>>>>> 6563f1c97d3357dec1f376f60b1d8f71233b8a31
      return all;
    }
    const prodGet = await Product.findAll({
      where: { categoryName: category },
<<<<<<< HEAD
=======
      include: {
        model: Inventory,
        attributes: ["quantity"],
      },
>>>>>>> 6563f1c97d3357dec1f376f60b1d8f71233b8a31
    });
    return prodGet;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { getProducts };
