const Sequelize = require('sequelize');


const config = require('../config/db.config');



const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorAliasies: false,
  logging: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.toDoItems = require('./toDoItem.model.js')(sequelize, Sequelize);

module.exports = db;
