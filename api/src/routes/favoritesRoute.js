const { Router } = require("express");
const { getFavorite, getAllFavorites } = require("../controllers/getFavorite");
const postFavorites = require("../controllers/postFavorites")
const favoritesRoute = Router();

favoritesRoute.post('/', async (req, res) => {
    try {
        const newFavorite = await postFavorites(req.body);
        res.status(201).send(newFavorite)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

favoritesRoute.get('/:id', async (req, res) => {
    try {
        const user = await getFavorite(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

favoritesRoute.get('/', async (res) => {
    try {
        const users = await getAllFavorites()
        res.status(200).send(users)

    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

module.exports = { favoritesRoute } 