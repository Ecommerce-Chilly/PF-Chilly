const { Discount } = require("../../db");

const putDiscounts = async ({ name, description, percent, active }) => {
  try {
    const discounts = await Discount.findByPk(name);
    if (!discounts)
      throw (`The discounts with id: ${id} is not exist`);
    discounts.description = description;
    discounts.percent = percent;
    discounts.active = active;
    await discounts.save();
    return discounts;
  } catch (error) {
    throw (error);
  }
};
module.exports = { putDiscounts };