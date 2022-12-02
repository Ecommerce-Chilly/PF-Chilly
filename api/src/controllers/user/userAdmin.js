const { User } = require("../../db")

const userAdmin = async ({ email }) => {
  const user = await User.findOne({ where: { email: email } })
  if (!user) throw (`User with email: ${email} not found`)
  user.admin = true
  user.save()
  return true
}

module.exports = { userAdmin }