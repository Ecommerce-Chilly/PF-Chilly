const { Product, Category, Inventory, Discount } = require("../db");
const postInvetory = require("./postInventory");
const { defaultDiscount } = require('./defaultDiscount')

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
  if (!name || !price || !details || !category || !quantity) {
    throw Error("Sending incomplete information!");
  } else {
    let discountDB
    const invCreate = await postInvetory(quantity);
    if (!discount || discount === '') {
      discountDB = await Discount.findOne({ where: { name: "JoseMa" } })
      if (!discountDB) discountDB = await defaultDiscount()
    }
    if (discount) {
      discountDB = await Discount.findOne({ where: { name: discount } });
    }
    const categoryDB = await Category.findOne({ where: { name: category } });
    const proCreate = await Product.create({
      name,
      price,
      details,
      brand,
      model,
    });
    await proCreate.setCategory(categoryDB);
    await proCreate.setDiscount(discountDB);
    await invCreate.setProduct(proCreate);
    await proCreate.setInventory(invCreate);

    return proCreate;
  }
};

module.exports = { postProduct };
