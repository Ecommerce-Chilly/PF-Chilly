const { Cart_items, Cart } = require("../../db")


const cleanCart = async (userId) => {
    try {
        console.log("entering try")
        const foundCart = await Cart.findOne({ where: { userId: userId } })
        console.log(foundCart)
        const cleanedCart = await Cart_items.destroy(
            { where: { cartId: foundCart.id } }
        )
        return "cart succesfully cleaned"
    } catch (error) {

    }
}

module.exports = { cleanCart }