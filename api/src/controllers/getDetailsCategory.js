const { Product } = require("../db");
const { getProducts } = require("./getProducts");
const getDetailsCategory = async (category) => {
  try {
    console.log(category);
    const productsCategory = await getProducts(category);
    console.log(productsCategory);
    const detailsName = Object.keys(productsCategory[0].details[0]);
    let details = { name: category };
    detailsName.forEach((el) => {
      details[el] = [];
    });
    for (let i = 0; i < productsCategory.length; i++) {
      const el = productsCategory[i];
      detailsName.forEach((elem) => {
        details[elem].push(...[el.details[0][elem]]);
      });
    }
    detailsName.forEach((elem) => {
      const detailSet = new Set(details[elem]);
      details[elem] = [];
      detailSet.forEach((el) => {
        details[elem].push(...[el]);
      });
    });
    return details;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { getDetailsCategory };
