const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
   sequelize.define(
      "inventory",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         quantity: {
            type: DataTypes.INTEGER,
         },
<<<<<<< HEAD
=======
         status: {
             type: DataTypes.BOOLEAN,
             defaultValue:true,
         },
>>>>>>> 44fe9fa9264024360b95c6cda0f8753ee688b9e0
      },
      {
         timestamps: false,
         paranoid: true,
      }
   );
};
