const { Order_items } = require("../../db");

const deleteOrderItems = async (id) => {
    try {
        const foundOrderItems = await Order_items.findByPk(id);
        if (!foundOrderItems)
            throw (`The Order_items with the id ${id} doesn't exist`);
        await Order_items.destroy({ where: { id: id } });
        return "Order_items has been successfully deleted";
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { deleteOrderItems };