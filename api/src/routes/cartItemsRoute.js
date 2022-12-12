const { Router } = require("express")
const { postCartItems } = require("../controllers/cart_items/postCartItems")
const { modifyQuantity } = require("../controllers/cart_items/modifyCartItems")
const { deleteItem } = require("../controllers/cart_items/deleteCartItem")

const cartItemsRoute = Router()

cartItemsRoute.post('/', async (req, res) => {
    try {
        const cart_items = await postCartItems(req.body)
        res.status(201).send(cart_items)
    } catch (error) {
        res.status(404).send(error)
    }
})

cartItemsRoute.put('/', async (req, res) => {
    try {
        const id = req.body.id
        const quantity = req.body.quantity
        const updateQuantity = await modifyQuantity(id, quantity)
        res.status(202).send(updateQuantity)
    } catch (error) {
        res.status(304).send({ msg: "not modified" }, error)

    }
})

cartItemsRoute.delete('/:id', async (req, res) => {
    try {
        console.log("la concha de mi abuela estoy entrando la puta que te parió")
        const deleteCartItem = await deleteItem(req.params.id);
        res.status(202).send(deleteCartItem)
        console.log("tomaaa la concha de su madre todo está ok")
    } catch (error) {
        console.log("tus rutas y funciones son una verga amigo", error)
        res.status(404).send(error)
    }
})


module.exports = cartItemsRoute