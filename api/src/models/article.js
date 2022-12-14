const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define(
    'article',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          'https://www.rastanley.com.au/img/products/NoImageLarge.png',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
