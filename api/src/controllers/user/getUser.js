const { User, Order_items } = require("../../db")

const getUser = async (id, email) => {
  try {
    if (!id || !email) {
      const allUsers = await User.findAll()
      if (allUsers.length === 0) throw "no users logged in the Data Base"
      return allUsers
    }
    if (email || !id) {
      const user = await User.findOne({
        where: { email: email }
      })
      if (!user) throw "User not found"
      return user
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