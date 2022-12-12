const { User } = require("../../db");
const cartItemsRoute = require("../../routes/cartItemsRoute");

const postUser = async ({
  id, email, name, img
}) => {
  try {
    if (!email) throw "You need to fill all fields";
    const findUser = await User.findOne({
      where: { email: email },

    })
    if (findUser) throw `The user with the email ${email} exist`
    await User.create({ id, email, name, img })
    return `the user was created`
  } catch (error) {
    throw (error)
  }
};


module.exports = postUser;