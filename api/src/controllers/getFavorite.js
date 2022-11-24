const { Favorite } = require("../db")

const getFavorite = async (id) => {
    try {
        const favoriteById = await Favorite.findAll({ where: { id: id } })
        return favoriteById
    } catch (error) {
        console.log(error)
    }
}

const getAllFavorites = async () => {
    try {
        const allFavorites = await Favorite.findAll()
        return allFavorites
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getFavorite, getAllFavorites }