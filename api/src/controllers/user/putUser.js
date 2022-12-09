const { User } = require('../../db')
const putUser = async ({ userId, name, img }) => {
  try {
    const user = await User.findByPk(userId)
    if (user) throw (`User not found`)
    user.name = name
    user.img = img
    user.save()
    return `User changed`
  } catch (error) {
    throw (error)
  }
}
module.exports = { putUser }