const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "order_details",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         total: {
            type: DataTypes.INTEGER,
         },
      },
      {
         timestamps: true,
         paranoid: true,
      }
   );
};
