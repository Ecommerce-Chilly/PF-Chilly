const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT(2),
            allowNull: false
        },
        details: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    },{
        timestamps: false
    })
}