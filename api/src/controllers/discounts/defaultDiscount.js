const { Discount } = require('../../db')

const defaultDiscount = async ({ transaction } = {}) => {
  const [discount] = await Discount.findOrCreate({
    where: { name: 'JoseMa' },
    defaults: {
      description: 'Default demo discount',
      percent: 5,
      active: true,
    },
    transaction,
  })
  return discount
}

module.exports = { defaultDiscount };
