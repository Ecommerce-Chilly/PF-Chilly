const { DataTypes } = require("sequelize");
<<<<<<< HEAD
=======

>>>>>>> 6e7355d84470fde1f722ce15d628d2c7e6dc53f7
module.exports = (sequelize) => {
   sequelize.define(
      "product",
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
         price: {
            type: DataTypes.FLOAT(2),
            allowNull: false,
            defaultValue: 50.0,
         },
         brand: {
            type: DataTypes.STRING,
            validate: {
               isAlph: true,
            },
         },
         model: {
            type: DataTypes.STRING,
         },
         image: {
            type: DataTypes.STRING,
            defaultValue: "no hay imagen bro coloca la imagen cinthia",
         },
         details: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false,
         },
      },
<<<<<<< HEAD
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT(2),
        allowNull: false,
        defaultValue: 50.0,
      },
      brand: {
        type: DataTypes.STRING,
      },
      model: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: 'no hay imagen bro coloca la imagen cinthia',
      },
      details: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
    });
=======
      {
         timestamps: false,
      }
   );
>>>>>>> 6e7355d84470fde1f722ce15d628d2c7e6dc53f7
};
