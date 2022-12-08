const { Product, Category, Discount } = require("../../db");
const { putInventory } = require("../inventory/putInventory");
const putProducts = async (
  id,
  { name, price, brand, image, model, details, category, discount, quantity }
) => {
  try {
    if (!name || !price || !details || !category || !quantity) {
      throw "Sending incomplete information!";
    }
    const product = await Product.findByPk(id);
    if (!product) throw `The product with id: ${id} is not exist`;
    if (!name || !price || !details || !category || !quantity) {
      throw "Sending incomplete information!";
    }
    product.name = name;
    product.price = price;
    product.brand = brand;
    product.model = model;
    product.image = image;
    product.details = details;
    const categoryDB = await Category.findOne({ where: { name: category } });
    const discountDB = await Discount.findOne({ where: { name: discount } });
    await product.setCategory(categoryDB);
    await product.setDiscount(discountDB);
    putInventory(product.inventoryId, quantity);
    await product.save();
    return "Product successfully modified";
  } catch (error) {
    throw error;
  }
};
module.exports = { putProducts };
