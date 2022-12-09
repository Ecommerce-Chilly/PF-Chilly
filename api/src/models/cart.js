const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
<<<<<<< HEAD
    sequelize.define(
        "cart",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );
=======
  sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.JSON)
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
>>>>>>> 184ddd580be7e445068d15f3ab2d92d052008361
};
