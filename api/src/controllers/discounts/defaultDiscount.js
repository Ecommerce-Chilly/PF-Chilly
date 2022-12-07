const { postDiscounts } = require('../discounts/postDiscounts')

const defaultDiscount = async () => {
  const discount = await postDiscounts({ name: "JoseMa", description: "The JoseMa Disocunt ", percent: 5 })
  return discount
}

module.exports = { defaultDiscount };