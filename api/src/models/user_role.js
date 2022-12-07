const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "user_role",
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
         },
      },
      {
         timestamps: true,
      }
   );
};
