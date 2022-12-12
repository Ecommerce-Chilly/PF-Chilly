const { Cart_items } = require("../../db")


const deleteItem = async (id) => {
    try {
        console.log("estoy entrando a la funcion puto")
        const foundItem = await Cart_items.findByPk(id)
        if (!foundItem)
            throw (`the item with the id ${id} doesn't exist`)
        await Cart_items.destroy(
            { where: { id: id } }
        );
        return "item deleted"
    } catch (error) {
        console.log("chupate un pito y comete este error", error)
    }
}

module.exports = { deleteItem }