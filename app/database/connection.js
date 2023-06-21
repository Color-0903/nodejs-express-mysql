require('dotenv').config(); 
const { Sequelize } = require('sequelize');
const db_config = require('../config/db.config');

const connection = new Sequelize(db_config.DB, db_config.USER, db_config.PASSWORD, {
  host: db_config.HOST,
  dialect: 'mysql'
});

module.exports = connection;
