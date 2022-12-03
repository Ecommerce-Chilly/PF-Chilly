const { User } = require("../../db");

const postUser = async ({
  email,
}) => {
  try {
    if (!email) throw "You need to fill all fields";
    const findUser = await User.findOne({ where: { email: email } })
    if (findUser) throw `The user with the email ${email} exist`
    await User.create({ email })
    return `the user was created`
  } catch (error) {
    throw (error)
  }
};


module.exports = postUser;