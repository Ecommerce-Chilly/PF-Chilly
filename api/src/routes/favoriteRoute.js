const { Router } = require("express");
const { addFavorites } = require("../controllers/favorite/addFavorites");
const { removeFavorites } = require("../controllers/favorite/removeFavorite");
const { getFavorites } = require("../controllers/favorite/getFavorites");
const { checkJwt } = require('../middleware/oAuth')
const favoriteRoute = Router();

favoriteRoute.get("/:userId", checkJwt, async (req, res) => {
  try {
    const { userId } = req.params;
    const fav = await getFavorites(userId);
    res.send(fav);
  } catch (error) {
    res.status(404).send(error);
  }
});

favoriteRoute.post("/", checkJwt, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const msg = await addFavorites(userId, productId);
    res.send(msg);
  } catch (error) {
    res.status(404).send(error);
  }
});

favoriteRoute.delete("/:userId/:productId", checkJwt, async (req, res) => {
  try {
    const { userId, productId } = req.params;

    console.log(userId, productId);
    const msg = await removeFavorites(userId, productId);
    res.send(msg);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = favoriteRoute;