const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      validate: { isAlphanumeric: true },
    },
  },
  {
    timestamps: true,
  }
 );
};
