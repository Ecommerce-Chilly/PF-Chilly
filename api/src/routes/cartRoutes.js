const { Router } = require("express");
const { addCart } = require("../controllers/cart/addCart");
const { addProduct } = require("../controllers/cart/addProduct");
const { removeProductCart } = require("../controllers/cart/removeProductCart");

const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
  try {
    const cart = await addCart(req.body)
    res.send(cart)
  } catch (error) {
    res.send(error)
  }
})
cartRouter.put('/', async (req, res) => {
  try {
    const cart = await addProduct(req.body)
    res.send(cart)
  } catch (error) {
    res.status(400).send(error)
  }
})
cartRouter.put('/remove', async (req, res) => {
  try {
    const cart = await removeProductCart(req.body)
    res.send(cart)
  } catch (error) {
    res.status(400).send(error)
  }
})
module.exports = cartRouter