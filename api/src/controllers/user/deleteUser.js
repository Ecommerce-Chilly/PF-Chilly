const { User } = require("../../db");

const deleteUser = async (id) => {
  try {
    const foundUser = await User.findByPk(id);
    if (!foundUser)
      throw (`The User with the id ${id} doesn't exist`);
    await User.destroy({ where: { id: id } });
    return "User has been successfully deleted";
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { deleteUser };