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
         user_id: {
            type: DataTypes.INTEGER,
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
