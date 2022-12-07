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
      name: {
        type: DataTypes.STRING
      },
      img: {
        type: DataTypes.STRING
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValues: false
      },
      clouding: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
      paranoid: true,
      indexes: [
        // Create a unique index on email
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );
};
