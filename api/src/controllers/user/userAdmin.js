const { User } = require("../../db")

const userAdmin = async ({ email }) => {
  try {
    const user = await User.findOne({ where: { email: email } })
    if (!user) throw (`User with email: ${email} not found`)
    user.admin = true
    user.save()
    return true
  } catch (error) {
    throw error
  }
}

module.exports = { userAdmin }