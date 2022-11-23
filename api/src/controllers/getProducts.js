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

      async function getProducts(category, id) {
        try {
          if (id) {
            const product = await Product.findByPk(id, {
              include: {
                model: Inventory,
                attributes: ['quantity'],
              },
            });
            if (!product)
              throw new Error(`Product with id ${id} is not exist`);
            return product;
          }
          if (!category) {
            const all = await Product.findAll({
              include: {
                model: Inventory,
                attributes: ['quantity'],
              },
            });




            return all;
          }
          const prodGet = await Product.findAll({
            where: { categoryName: category },





            include: {
              model: Inventory,
              attributes: ['quantity'],
            },
          });
          return prodGet;
        } catch (error) {
          throw new Error(error);
        }
      }
module.exports = { getProducts };
