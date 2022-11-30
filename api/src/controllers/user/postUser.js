const { User } = require("../../db");

const postUser = async ({
  email,
  password,

}) => {
  try {
    if (!email || !password) throw "You need to fill all fields";

    const userExist = await User.findOne({ where: { email, password } });
    if (userExist) throw "User exist";
    else {
      const userCreate = await User.create({
        email,
        password,
      });
      return "User created";
    }
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = postUser;