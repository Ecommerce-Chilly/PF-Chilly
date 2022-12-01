const { DataTypes } = require("sequelize");
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
        // validate: {
        //   isAlph: true,
        // },
      },
      model: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "https://www.gastroactitud.com/wp-content/uploads/2018/12/OstrasAmlie.jpg",
      },
      details: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );
};
