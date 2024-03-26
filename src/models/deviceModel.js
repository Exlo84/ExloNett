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
    // Updated to allow null values to handle cases where the device name isn't immediately known
    allowNull: true 
  },
  os: {
    type: DataTypes.STRING,
    // Allowing null to accommodate devices where the OS is unknown
    allowNull: true
  },
  macAddress: {
    type: DataTypes.STRING,
    // Allowing null for cases where the MAC address cannot be retrieved
    allowNull: true
  },
  notificationsEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastSeen: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

module.exports = { Device, sequelize };
