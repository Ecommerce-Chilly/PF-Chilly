const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "discount",
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        // validate: { isAlpha: true },
      },
      description: {
        type: DataTypes.STRING,
      },
      percent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // validate: { isInt: true },
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
