const { Discount } = require("../../db");

const postDiscounts = async ({ name, description, percent, active }) => {
  try {
    if ((!name, !description, !percent))
      throw ("Send all Data please");
    const discountCreate = await Discount.create({
      name,
      description,
      percent,
      active,
    });
    return discountCreate;
  } catch (error) {
    throw error;
  }
};
module.exports = { postDiscounts };