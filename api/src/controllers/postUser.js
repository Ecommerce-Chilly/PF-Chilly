const { User } = require("../db");

const postUser = async ({ eMail, password, name, lastName }) => {
    if (!eMail || !password || !name || !lastName) throw new Error("Send a quantity of products");
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
