const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
    {
      timestamps: false
    });
};
