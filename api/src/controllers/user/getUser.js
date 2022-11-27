const { User } = require("../../db");

const getUser = async (email, password) => {
  try {
    const usersById = await User.findOne({
      where: { email: email, password: password },
    });
    return usersById;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await User.findAll();
    return allUsers;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, getAllUsers };
