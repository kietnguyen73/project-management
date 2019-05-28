const Sequelize = require('../../../database/db').Sequelize;
const db = require('../../../database/db').db;

const database = {};

database.Employee = require('../Employee')(db, Sequelize);

module.exports = database;