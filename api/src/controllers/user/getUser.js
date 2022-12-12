const { User, Order_items } = require("../../db")

const getUser = async (email) => {
  try {
    const user = await User.findOne({
      where: { email: email },
      include: Order_items
    })
    if (!user) throw "User not found"
    return user
  } catch (error) {
    throw error;
  }
};
const getAllUsers = async () => {
  try {
    const users = await User.findAll()
    return users
  } catch (error) {
    throw error
  }
}


module.exports = { getUser, getAllUsers };