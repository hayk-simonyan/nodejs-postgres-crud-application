const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
