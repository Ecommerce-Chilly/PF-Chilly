const { Product } = require("../db");
const { getProducts } = require("./getProducts");
const getDetailsProducts = async (category) => {
  const productsCategory = await getProducts(category);

  const details = productsCategory[0].details.flatMap((el) => Object.keys(el));
  console.log(details);
};
module.exports = { getDetailsProducts };
