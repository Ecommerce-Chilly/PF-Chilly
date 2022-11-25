const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "inventory",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         quantity: {
            type: DataTypes.INTEGER,
         },
      },
      {
         timestamps: false,
         paranoid: true,
      }
   );
};
