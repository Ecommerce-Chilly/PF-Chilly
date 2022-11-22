const { User } = require("../db");

const postUser = async ({ eMail, password, name, lastName }) => {
    if (!eMail || !password) throw new Error("You need to fill all fields");
    try {
        const userCreate = await User.create({
            eMail,
            password,

        });
        return userCreate;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = postUser;
