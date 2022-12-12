const { Cart_items, Cart, Product } = require("../../db")


const deleteItem = async ({ cartId, productId }) => {
    try {
        const foundCartId = await Cart.findByPk(cartId)
        const foundProduct = await Product.findByPk(productId)
        if (!foundCartId)
            throw (`the item with the id ${id} doesn't exist`)
        await Cart_items.destroy(
            { where: { cartId: cartId, productId: productId } }
        );
        return "item deleted"
    } catch (error) {
        console.log(error)
    }
}

module.exports = { deleteItem }