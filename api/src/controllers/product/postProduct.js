const { Product, Category, Inventory, Discount } = require("../../db");
const postInvetory = require("../inventory/postInventory");
const { defaultDiscount } = require('../discounts/defaultDiscount')

const postProduct = async ({
  name,
  price,
  brand,
  model,
  details,
  image,
  category,
  discount,
  quantity,
}) => {
  if (!name || !price || !details || !category || !quantity) {
    throw ("Sending incomplete information!");
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
      image,
      brand,
      model,
    });
    await proCreate.setCategory(categoryDB);
    await proCreate.setDiscount(discountDB);
    await invCreate.setProduct(proCreate);
    await proCreate.setInventory(invCreate);

    return 'Product was create';
  }
};

module.exports = { postProduct };
