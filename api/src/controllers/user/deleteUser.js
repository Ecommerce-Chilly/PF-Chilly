const { User } = require("../../db");

const deleteUser = async (id) => {
    try {
        if (!id) throw ("Send an id");
        const foundUser = await User.findByPk(id);
        if (!foundUser)
            throw (`The User with the id ${id} is not exist`);
        await User.destroy({ where: { id: id } });
        return "User deleted";
    } catch (error) {
        throw (error);
    }
};

module.exports = { deleteUser };