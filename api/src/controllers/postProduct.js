const { Product, Category, Inventory, Discount } = require("../db");
const caseData = require("../dataApi/case.json");
const postInvetory = require("./postInventory");
// const dataCategory = require('../data/data-category.json')
// const caseData = require("./src/dataApi/case.json");
// const postInvetory = require("./src/controllers/postInventory");

const postProduct = async ({
  name,
  price,
  brand,
  model,
  details,
  category,
  discount,
  quantity,
}) => {
  if (!name || !price || !details || !category || !discount || !quantity) {
    throw Error("Sending incomplete information!");
  } else {
    const invCreate = await postInvetory(quantity);
    const discountDB = await Discount.findOne({ where: { name: discount } });
    const categoryDB = await Category.findOne({ where: { name: category } });
    const proCreate = await Product.create({
      name,
      price,
      details,
    });
    await proCreate.setCategory(categoryDB);
    await proCreate.setDiscount(discountDB);
    await invCreate.setProduct(proCreate);
    await proCreate.setInventory(invCreate);

    return proCreate;
  }
};

module.exports = { postProduct };