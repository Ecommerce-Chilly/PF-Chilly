const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "payment_detail",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },

         session_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         session_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
      },
      {
         timestamp: true,
      }
   );
};
