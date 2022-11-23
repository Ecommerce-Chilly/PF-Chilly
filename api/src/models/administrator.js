const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "administrator",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
         },
         email: {
            type: DataTypes.STRING,
            validate: { isEmail: true },
         },
         name: {
            type: DataTypes.STRING,
            validate: { isAlpha: true },
         },
         last_name: {
            type: DataTypes.STRING,
            validate: { isAlpha: true },
         },
      },
      {
         timestamps: true,
      }
   );
};
