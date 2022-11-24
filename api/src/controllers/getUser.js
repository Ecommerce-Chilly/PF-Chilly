const { where } = require("sequelize")
const { User } = require("../db")

const getUser = async (id) => {
    try {
        const usersById = await User.findAll({ where: { id: id } })
        return usersById
    } catch (error) {
        console.log(error)
    }
}

const getAllUsers = async () => {
    try {
        const allUsers = await User.findAll()
        return allUsers
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getUser, getAllUsers }