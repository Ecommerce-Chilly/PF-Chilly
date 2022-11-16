const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("discount", {
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
    percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  });
};
