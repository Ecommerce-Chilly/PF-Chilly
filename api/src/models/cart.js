const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define(
    'cart',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ['userId'],
        },
      ],
    }
  );
};
