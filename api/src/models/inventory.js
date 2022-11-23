const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
<<<<<<< HEAD
    sequelize.define('inventory', {
        id: {
=======
   sequelize.define(
      "inventory",
      {
         id: {
>>>>>>> 6e7355d84470fde1f722ce15d628d2c7e6dc53f7
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         quantity: {
            type: DataTypes.INTEGER,
<<<<<<< HEAD
            allowNull: false
        },
    },
    );
}
=======
         },
         status: {
             type: DataTypes.BOOLEAN,
             defaultValue:true,
         },
      },
      {
         timestamps: false,
         paranoid: true,
      }
   );
};
>>>>>>> 6e7355d84470fde1f722ce15d628d2c7e6dc53f7
