const { Product, Inventory } = require("../../db");

const deleteProduct = async (id) => {
  try {
    if (!id) throw ("Send an id");
    const foundProduct = await Product.findByPk(id);
    if (!foundProduct)
      throw (`The product with the id ${id} is not exist`);
    // await Inventory.destroy({ where: { id: foundProduct.inventoryId } });
    await Product.destroy({ where: { id: id } });
    return "Product deleted";
  } catch (error) {
    throw (error);
  }
};

module.exports = { deleteProduct };
