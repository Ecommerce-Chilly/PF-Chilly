const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
   sequelize.define("fav", {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      product_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   });
};
