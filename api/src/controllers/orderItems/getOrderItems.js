const { Order_items } = require("../../db")

const getOrderItems = async (id) => {
  try {
    if (!id) throw "no Id found"
    const OrderItemsById = await Order_items.findByPk(id)
    return OrderItemsById
  } catch (error) {
    throw (error)
  }
}

const getAllOrders = async () => {
  try {
    const allUsers = await Order_items.findAll()
    return allUsers
  } catch (error) {
    throw (error)
  }
}

module.exports = { getOrderItems, getAllOrders }