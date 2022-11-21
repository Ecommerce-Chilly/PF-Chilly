const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "order_items",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         user_id: {
            type: DataTypes.INTEGER,
         },
         product_id: {
            type: DataTypes.INTEGER,
         },
         quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         deleted_at: {
            type: DataTypes.INTEGER,
         },
      },
      {
         timestamps: true,
      }
   );
};
