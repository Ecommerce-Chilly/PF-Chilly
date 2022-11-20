const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("payment_user", {

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
        account_jno: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        expiry: {
            type: DataTypes.DATE,
        },
    },
        {
            timestamps: false,
        });
};