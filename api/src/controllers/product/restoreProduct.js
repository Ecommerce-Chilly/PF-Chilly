const { Product } = require("../../db");
const { Op } = require('sequelize')

const restoreProduct = async (id) => {
  await Product.restore({
    where: {
      [Op.and]: [
        { id: id },
        { deletedAt: { [Op.not]: null } }
      ]
    }
  })

  return `Product with id ${id} restore`
}


module.exports = { restoreProduct }