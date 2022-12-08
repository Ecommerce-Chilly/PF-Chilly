// const { Product } = require("../../db");
const { getProducts } = require("../product/getProducts");

const getDetailsCategory = async (category) => {
  try {
    const productsCategory = await getProducts(category, null, null);
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
    throw (error);
  }
};
module.exports = { getDetailsCategory };