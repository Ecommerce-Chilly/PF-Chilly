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
         },
         user_id: {
            type: DataTypes.INTEGER,
         },
         total: {
            type: DataTypes.INTEGER,
         },
         direction: {
            type: DataTypes.STRING,
         },
         dni: {
            type: DataTypes.STRING,
         },
         zip: {
            type: DataTypes.INTEGER,
         },
         country: {
            type: DataTypes.STRING,
         },
         depprov: {
            type: DataTypes.STRING,
         },
         city: {
            type: DataTypes.INTEGER,
         },
      },
      {
         timestamps: true,
      }
   );
};
