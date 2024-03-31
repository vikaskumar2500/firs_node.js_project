const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.STRING(255),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = Users;
