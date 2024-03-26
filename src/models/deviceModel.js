// src/models/deviceModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false // Disable logging for better performance
});

const Device = sequelize.define('Device', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deviceName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  os: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notificationsEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = { Device, sequelize };