const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('datauser', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        direction: {
            type: DataTypes.STRING,
        },
        dni: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        zip: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        }
    }, {
        createdAt: false,
        updatedAt: false,
    })
};
