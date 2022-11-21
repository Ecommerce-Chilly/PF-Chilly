const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "product_category",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
         },
         description: {
            type: DataTypes.STRING,
         },
      },
      {
         timestamp: true,
      }
   );
};
