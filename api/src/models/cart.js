const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "cart",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            products: {
                type: DataTypes.ARRAY(DataTypes.JSON)
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );
};
