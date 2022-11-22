const { Product, Inventory } = require("../db");

const deleteProduct = async (id) => {
  try {
    if (!id) throw new Error("Send an id");
    const foundProduct = await Product.findByPk(id);
    if (!foundProduct)
      throw new Error(`The product with the id ${id} is not exist`);
    await Inventory.destroy({ where: { id: foundProduct.inventoryId } });
    await Product.destroy({ where: { id: id } });
    return "Product delete";
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { deleteProduct };
