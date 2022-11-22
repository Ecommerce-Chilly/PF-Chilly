const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
   sequelize.define("favorite", {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false,
         unique: true,
      },
   });
};
