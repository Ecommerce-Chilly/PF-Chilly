const { where } = require("sequelize")
const { User } = require("../db")

const findOrCreate = async ({ eMail, password, name, lastName }) => {
    if (!eMail || !password || !name || !lastName) return User.findOrCreate(where)
}