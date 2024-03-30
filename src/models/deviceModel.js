const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Define the path for the SQLite database within the "db" folder
const dbPath = path.join(__dirname, '..', 'db', 'database.sqlite');

// Initialize Sequelize with the updated storage path
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath // Use the dbPath variable for the storage location
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
    allowNull: false // Updated to ensure device name is always required
  },
  os: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Unknown" // Added field for OS, defaults to "Unknown"
  },
  macAddress: {
    type: DataTypes.STRING,
    allowNull: false // Ensuring MAC address is required for each device
  },
  notificationsEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lastSeen: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

module.exports = { Device, sequelize };
