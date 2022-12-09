const { Cart_items, Cart, Products } = require('../../db')
const postCartItems = async (quantity) => {
    try {
        if (!quantity || !cartId || !productId) throw (" you must fill all fields ");
        const foundProduct = await Product.findByPk(userId);
        const foundCart = await Cart.findByPk(cartId)
        const cart = await Cart_items.create();
        await cart.setUser(foundUser)
        return cart
    } catch (error) {
        throw (error)
    }
}

module.exports = { postCartItems }