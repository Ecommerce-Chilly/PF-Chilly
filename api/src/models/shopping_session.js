const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "shopping_session",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
        defaultValues: "Peding to pay"
      }
    },
    {
      timestamps: true,
    }
  );
};
