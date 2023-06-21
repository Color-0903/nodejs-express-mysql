const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class SIZE extends Model {}
SIZE.init(
  {
    SIZE: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    PRICE: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'SIZE',
    tableName: 'size',
    timestamps: false
  }
);

module.exports = SIZE;
