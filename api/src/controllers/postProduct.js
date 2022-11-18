const { Product, Category, Inventory, Discount } = require("../db");
const invetoryRoutes = require("../routes/inventoryRoute");
// const dataCategory = require('../data/data-category.json')
const postInvetory = require("./postInventory");
const postProduct = async ({
  name,
  price,
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
