const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define("payment_user", {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false,
      },
      payment_type: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      provider: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      account_no: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      expiry: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            isDate: true,
         },
      },
   });
};
