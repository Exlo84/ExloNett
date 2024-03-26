// src/services/deviceService.js
const { Device } = require('../models/deviceModel');
const discordService = require('./discordService');
const networkUtils = require('../utils/networkUtils');

exports.getAllDevices = async () => {
  return await Device.findAll();
};

exports.addDevice = async (device) => {
  // Ensure there is a default value for the os field
  const deviceWithDefaultOS = {
    ...device,
    os: device.os || 'Unknown' // Set 'Unknown' if os field is not provided
  };

  const newDevice = await Device.create(deviceWithDefaultOS);
  discordService.sendNotification(`New device detected: ${device.deviceName}`);
  return newDevice;
};

exports.updateDevice = async (id, updates) => {
  const device = await Device.findByPk(id);
  if (!device) {
    throw new Error('Device not found');
  }
  return await device.update(updates);
};

exports.deleteDevice = async (id) => {
  const device = await Device.findByPk(id);
  if (!device) {
    throw new Error('Device not found');
  }
  return await device.destroy();
};

exports.startNetworkScanning = async () => {
  console.log('Starting network scanning...');
  setInterval(async () => {
    try {
      const devices = await networkUtils.scanNetworkDevices();
      for (const device of devices) {
        const existingDevice = await Device.findOne({ where: { ipAddress: device.ipAddress } });
        if (!existingDevice) {
          await exports.addDevice(device);
        } else {
          discordService.sendNotification(`Known device found: ${device.deviceName}`);
        }
      }
    } catch (err) {
      console.error('Error scanning network:', err);
    }
  }, 60000); // Scan every 60 seconds (1 minute)
};
