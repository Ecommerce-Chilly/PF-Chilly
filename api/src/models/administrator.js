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
         },
         email: {
            type: DataTypes.STRING,
         },
         name: {
            type: DataTypes.STRING,
         },
         last_name: {
            type: DataTypes.STRING,
         },
      },
      {
         timestamps: true,
      }
   );
};
