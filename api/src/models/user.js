const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "user",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               isEmail: true,
            },
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
            //validate: {xxxxxx: true,},
         },
      },
      {
         timestamps: true,
      }
   );
};
