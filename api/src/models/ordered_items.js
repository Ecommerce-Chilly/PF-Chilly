const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "ordered_items",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
      },
      {
         timestamps: true,
         paranoid: true,
      }
   );
};
