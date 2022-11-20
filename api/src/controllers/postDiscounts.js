const { Discount } = require("../db");

const postDiscounts = async ({ name, description, percent, active }) => {
  try {
    if ((!name, !description, !percent, !active))
      throw new Error("Send all Data please");
    const discountCreate = await Discount.create({
      name,
      description,
      percent,
      active,
    });
    return discountCreate;
  } catch (error) {
    return error;
  }
};
module.exports = { postDiscounts };
