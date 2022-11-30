const { User, Order_items } = require("../../db")

const getUser = async (id) => {
  try {
    if (!id) {
      const allUsers = await User.findAll()
      if (allUsers.length === 0) throw "no users logged in the Data Base"
      return allUsers
    }
    const usersById = await User.findByPk(id, {
      include: {
        model: Order_items,
        attributes: ['id', 'quantity']
      }
    },
    )
    if (!usersById) throw "User not found"
    return usersById
  } catch (error) {
    throw error;
  }
};


module.exports = { getUser };