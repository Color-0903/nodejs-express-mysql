const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class Order extends Model {}
Order.init(
  {
    ID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    PRODUCT_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SIZE: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PRICE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FULLNAME: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PHONE: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ADDRESS: {
      type: DataTypes.STRING,
      allowNull: false
    },
    STATUS: {
      type: DataTypes.INTEGER,
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
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false
  }
);

module.exports = Order;
