const { where } = require("sequelize")
const { User } = require("../db")

const getUser = async (id) => {
    try {
        const users = await User.findAll({ where: { id: id } })
        console.log(users)
        return users
    } catch (error) {
        console.log(error)
    }
}

module.exports = getUser