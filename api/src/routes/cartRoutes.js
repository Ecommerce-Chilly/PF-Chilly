const { Router } = require("express");
const { addCart } = require("../controllers/cart/addCart");
const { getCart, getAllCarts } = require("../controllers/cart/getCart.js")

const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
  try {
    const cart = await addCart(req.body)
    res.status(201).send(cart)
  } catch (error) {
    res.status(404).send(error)
  }
})


cartRouter.get('/:id', async (req, res) => {
  try {
    const cart = await getCart(req.params)
    res.status(201).send(cart)
  } catch (error) {
    res.status(404).send(error)
  }

})


module.exports = cartRouter