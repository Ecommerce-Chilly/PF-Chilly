const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("user_role", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
