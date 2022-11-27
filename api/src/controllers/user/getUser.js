const { User } = require("../../db")

const getUser = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } })
    if (!user) throw ("User not exits")
    return user
  } catch (error) {
    throw (error)
  }
}

const getAllUsers = async () => {
  try {
    const allUsers = await User.findAll()
    if (allUsers.length === 0) throw "There are not users"
    return allUsers
  } catch (error) {
    throw (error)
  }
}

module.exports = { getUser, getAllUsers }