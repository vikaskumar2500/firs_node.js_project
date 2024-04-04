const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Books = sequelize.define("books", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Books;
