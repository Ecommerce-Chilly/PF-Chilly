const { DataTypes, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "user_orders",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

        },
        {
            timestamps: true,
            paranoid: true,

        }
    );
}