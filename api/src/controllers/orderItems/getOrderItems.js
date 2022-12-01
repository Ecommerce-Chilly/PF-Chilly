const { Order_items } = require("../../db")

const getOrderItems = async (id) => {
    try {
        if (!id) throw "no Id found"
        const OrderItemsById = await Order_items.findOne({ where: { id: id } })
        return OrderItemsById
    } catch (error) {
        console.log(error)
    }
}

const getAllOrders = async () => {
    try {
        const allUsers = await Order_items.findAll()
        return allUsers
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getOrderItems, getAllOrders }