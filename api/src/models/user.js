const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
<<<<<<< HEAD
  sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    eMail: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },


  });
=======
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
>>>>>>> 6e7355d84470fde1f722ce15d628d2c7e6dc53f7
};
