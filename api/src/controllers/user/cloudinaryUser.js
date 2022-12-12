const { User } = require("../../db");

const cloudinaryUser = async (userId, cloudyId) => {
  try {
    const user = await User.findByPk(userId)
    if (!user) throw "User not found"
    user.clouding = cloudyId
    await user.save()
    return `Succesfully`
  } catch (error) {
    throw (error)
  }
}
module.exports = { cloudinaryUser }