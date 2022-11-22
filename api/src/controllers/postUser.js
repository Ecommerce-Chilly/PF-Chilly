const { User } = require("../db");

const postUser = async ({ eMail, password, name, lastName }) => {
    if (!eMail || !password || !name || !lastName) throw new Error("You need to fill all fields");
    try {
        const userCreate = await User.create({
            eMail,
            password,
            name,
            lastName,
        });
        return userCreate;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = postUser;
