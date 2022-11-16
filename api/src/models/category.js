const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("category", {
    id: {
      type: DataTypes.INTEGER,
      autuoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
};
