const { User, Order_items } = require("../../db")

const getUser = async (id) => {
  try {
    if (!id) throw ("no id was found")
    const usersById = await User.findByPk(id, {
      include: {
        model: Order_items,
        attributes: ['id', 'quantity']
      }
    },
    )
    if (!usersById) throw new Error("User not found")
    return usersById
  } catch (error) {
    console.log(error)
  }
}

const getAllUsers = async () => {
  try {
    const allUsers = await User.findAll()
    if (allUsers.length === 0) throw "no users logged in the Data Base"
    return allUsers
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getUser, getAllUsers }