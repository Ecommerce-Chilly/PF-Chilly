const { User } = require("../../db");

const postUser = async ({
  email,
}) => {
  try {
    if (!email) throw "You need to fill all fields";

    const userExist = await User.findOne({ where: { email } });
    if (userExist) throw "User exist";
    else {
      await User.create({
        email,
      });
      return "User created";
    }
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = postUser;