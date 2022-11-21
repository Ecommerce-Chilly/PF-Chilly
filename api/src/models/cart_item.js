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
         },
         session_id: {
            type: DataTypes.INTEGER,
         },
         product_id: {
            type: DataTypes.INTEGER,
         },
         quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
      },

      {
         timestamps: true,
      }
   );
};
