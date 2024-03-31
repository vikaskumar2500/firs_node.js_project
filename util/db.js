const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sys", "root", "vikas", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
