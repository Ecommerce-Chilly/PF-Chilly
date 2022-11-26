const { Router } = require("express");
<<<<<<< HEAD
const { getFavorite, getAllFavorites } = require("../controllers/getFavorite");
const postFavorites = require("../controllers/postFavorites");
const deleteFavorite = require("../controllers/deleteFavorite");
const favoritesRoute = Router();
=======
const { addFavorites } = require('../controllers/favorite/addFavorites')
const { removeFavorites } = require('../controllers/favorite/removeFavorite')
const { getFavorites } = require('../controllers/favorite/getFavorites')
const favoriteRoute = Router()
>>>>>>> 620647c6952243495d539c1e70f26b4f66e3e02a

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

