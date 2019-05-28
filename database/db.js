const Sequelize = require('sequelize');

const db = new Sequelize({
  database: process.env.MYSQL_DB_NAME,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
  dialectOptions: {
    ssl: false
  },
  define: {
    freezeTableName: true
  }
});

db.authenticate()
  .then(() => console.log("Connect to database successfully!"))
  .catch(err => console.log(err.message));

db.sync();

module.exports = {
  db : db,
  Sequelize : Sequelize
};