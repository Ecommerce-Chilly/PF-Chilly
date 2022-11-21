const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "order_details",
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
         total: {
            type: DataTypes.INTEGER,
         },
         payment_id: {
            type: DataTypes.STRING,
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
