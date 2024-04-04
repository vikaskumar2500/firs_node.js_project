const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const ReturnBooks = sequelize.define("returnBooks", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fine:{
    type:Sequelize.INTEGER,
  }
});

module.exports = ReturnBooks;
