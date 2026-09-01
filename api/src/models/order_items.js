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
         quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         checkoutSessionId: {
            type: DataTypes.STRING,
         },
      },
      {
         timestamps: true,
         paranoid: true,
         indexes: [
            {
               fields: ["checkoutSessionId"],
            },
         ],
      }
   );
};
