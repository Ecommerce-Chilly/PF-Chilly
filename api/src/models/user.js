const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
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
<<<<<<< HEAD
=======
            //validate: {xxxxxx: true,},
>>>>>>> 44fe9fa9264024360b95c6cda0f8753ee688b9e0
         },
      },
      {
         timestamps: true,
<<<<<<< HEAD
         indexes: [
            // Create a unique index on email
            {
               unique: true,
               fields: ["email"],
            },
         ],
=======
>>>>>>> 44fe9fa9264024360b95c6cda0f8753ee688b9e0
      }
   );
};
