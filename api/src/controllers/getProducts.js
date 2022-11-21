<<<<<<< HEAD
<<<<<<< HEAD
const { Product } = require("../db");

const getProducts = async ({ category }) => {
  console.log(category);
  try {
    if (!category) {
      const all = await Product.findAll();
=======
const { Product, Inventory } = require("../db");
=======
const { Product, Inventory } = require('../db');
>>>>>>> 1b99f42275cfc9f02a242c29b4eeebb4d650a753

const getProducts = async (category, id) => {
  try {
    if (id) {
      const product = await Product.findByPk(id, {
        include: {
          model: Inventory,
          attributes: ['quantity'],
        },
      });
      if (!product) throw new Error(`Product with id ${id} is not exist`);
      return product;
    }
    if (!category) {
      const all = await Product.findAll({
        include: {
          model: Inventory,
          attributes: ['quantity'],
        },
      });
<<<<<<< HEAD
>>>>>>> 6563f1c97d3357dec1f376f60b1d8f71233b8a31
=======
>>>>>>> 1b99f42275cfc9f02a242c29b4eeebb4d650a753
      return all;
    }
    const prodGet = await Product.findAll({
      where: { categoryName: category },
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 1b99f42275cfc9f02a242c29b4eeebb4d650a753
      include: {
        model: Inventory,
        attributes: ['quantity'],
      },
<<<<<<< HEAD
>>>>>>> 6563f1c97d3357dec1f376f60b1d8f71233b8a31
=======
>>>>>>> 1b99f42275cfc9f02a242c29b4eeebb4d650a753
    });
    return prodGet;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { getProducts };
