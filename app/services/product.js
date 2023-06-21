const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class Product extends Model {}
Product.init(
  {
    ID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: false
    },
    THUMBNAIL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    THUMBNAIL_ID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DES: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'CREATE_AT'
    },
    updateAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'UPDATE_AT'
    }
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'product',
    timestamps: false
  }
);

module.exports = Product;
