const { Product } = require("../db");

const putProducts = async (
  { name, price, brand, model, details, category, discount },
  { id }
) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) throw new Error(`The product with id: ${id} is not exist`);
    product.name = name;
    product.price = price;
    product.brand = brand;
    product.model = model;
    product.details = details;
    product.categoryName = category;
    product.discountName = discount;
    await product.save();
    return product;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { putProducts };
