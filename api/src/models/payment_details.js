const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "payment_details",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         amount: {
            type: DataTypes.INTEGER,
         },
         provider: {
            type: DataTypes.STRING,
            validate: { isAlph: true },
         },
         status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
         },
      },
      {
         timestamp: true,
      }
   );
};
