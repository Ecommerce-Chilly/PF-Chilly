const { Router } = require("express")
const { postCartItems } = require("../controllers/cart_items/postCartItems")


const cartItemsRoute = Router()

cartItemsRoute.post('/', async (req, res) => {
    try {
        const cart_items = await postCartItems(req.body)
        res.status(201).send(cart_items)
    } catch (error) {
        res.status(404).send(error)
    }
})


module.exports = cartItemsRoute