const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "product_inventory",
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
         status: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
         },
      },
      {
         timestamp: true,
      }
   );
};
