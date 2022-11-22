const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "discount",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isAlpha: true },
         },
         description: {
            type: DataTypes.STRING,
         },
         percent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { isInt: true },
         },
         active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
         },
      },
      {
         timestamps: true,
         paranoid: true,
      }
   );
};
