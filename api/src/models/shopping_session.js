const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "shopping_session",
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
      },
      {
         timestamps: true,
      }
   );
};
