const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("discount", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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
