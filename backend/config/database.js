const Sequelize = require("sequelize");

module.exports = new Sequelize("Groupomania", "root", "yCu[q`R?2y)*", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: require("mysql2"),
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
