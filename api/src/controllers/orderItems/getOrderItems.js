const { Order_items, User } = require('../../db');

const getOrderItems = async (id) => {
  try {
    if (!id) throw 'no Id found';
    const OrderItemsById = await Order_items.findByPk(id, {
      include: {
        model: User,
        attributes: ['email', 'name'],
      },
    });

    return OrderItemsById;
  } catch (error) {
    throw error;
  }
};

const getAllOrders = async () => {
  try {
    const allUsers = await Order_items.findAll({
      include: {
        model: User,
        attributes: ['email', 'name'],
      },
    });
    return allUsers;
  } catch (error) {
    throw error;
  }
};

module.exports = { getOrderItems, getAllOrders };
