const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "cart_item",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique:true,
         },
         quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { isNumeric: true },
         },
      },
      {
         timestamps: true,
      }
   );
};
