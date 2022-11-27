const { Router } = require("express");
const postOrderItems = require("../controllers/postOrderItems")
const orderItemsRoute = Router();

orderItemsRoute.post('/', async (req, res) => {
  try {
    const newOrderItems = await postOrderItems(req.body);
    res.status(201).send(newOrderItems)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
})

// favoritesRoute.get('/:id', async (req, res) => {
//     try {
//         const favorite = await getFavorite(req.params.id)
//         res.status(200).send(favorite)
//     } catch (error) {
//         res.status(404).send({ error: error.message })
//     }
// })

// favoritesRoute.get('/', async (req, res) => {
//     try {
//         const favorite = await getAllFavorites()
//         res.status(200).send(favorite)

//     } catch (error) {
//         res.status(404).send({ error: error.message })
//     }
// })

module.exports = orderItemsRoute