const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

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
    allowNull: true // Allow null as OS might not always be detected
  },
  macAddress: {
    type: DataTypes.STRING,
    allowNull: true // Allow null as MAC address might not always be detected
  },
  notificationsEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = { Device, sequelize };
