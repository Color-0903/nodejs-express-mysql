const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class User extends Model {}
User.init(
  {
    NAME: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ROLE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FULLNAME: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PHONE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ADDRESS: {
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
    modelName: 'User',
    tableName: 'user',
    timestamps: false
  }
);

module.exports = User;
