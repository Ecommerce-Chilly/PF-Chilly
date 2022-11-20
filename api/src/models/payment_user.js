const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("payment_user", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        payment_type: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        lastName: {
            type: DataTypes.STRING,
        },
    },
        {
            timestamps: false,
        });
};