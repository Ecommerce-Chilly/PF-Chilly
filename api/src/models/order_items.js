const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("order_items", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        pruduct_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
        {
            timestamps: false
        });
};
