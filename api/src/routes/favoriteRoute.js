const { Router } = require("express");
const { addFavorites } = require('../controllers/addFavorites')
const { removeFavorites } = require('../controllers/removeFavorite')
const { getFavorites } = require('../controllers/getFavorites')
const favoriteRoute = Router()

favoriteRoute.get('/', async (req, res) => {
  try {
    const { userId } = req.body
    const fav = await getFavorites(userId)
    res.send(fav)
  } catch (error) {
    res.status(404).send(error)
  }
})

favoriteRoute.post('/', async (req, res) => {
  try {
    const { userId, productId } = req.body
    const msg = await addFavorites(userId, productId)
    res.send(msg)
  } catch (error) {
    res.status(404).send(error)
  }
})
favoriteRoute.delete('/', async (req, res) => {
  try {
    const { userId, productId } = req.body
    const msg = await removeFavorites(userId, productId)
    res.send(msg)
  } catch (error) {
    res.status(404).send(error)
  }
})
module.exports = favoriteRoute