const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "data_user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        validate: { isAlpha: true },
      },
      city: {
        type: DataTypes.STRING,
        validate: { isAlpha: true },
      },
      postalcode: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true, len: [1, 6] },
      },
      mobile: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true, len: [1, 11] },
      },
    },
    {
      timestamps: false,
    }
  );
};