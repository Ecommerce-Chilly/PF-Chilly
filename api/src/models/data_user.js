const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "data_user",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
         },
         direction: {
            type: DataTypes.STRING,
            validate: { isAlphanumeric: true },
         },
         dni: {
            type: DataTypes.STRING,
            validate: { isAlphanumeric: true },
         },
         zip: {
            type: DataTypes.INTEGER,
            validate: { isAlphanumeric: true },
         },
         country: {
            type: DataTypes.STRING,
            validate: { isAlpha: true },
         },
         dep_prov: {
            type: DataTypes.STRING,
            validate: { isAlpha: true },
         },
         city: {
            type: DataTypes.STRING,
            validate: { isAlpha: true },
         },
      },
      {
         timestamps: false,
      }
   );
};
