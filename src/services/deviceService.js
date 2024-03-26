const { Device } = require('../models/deviceModel');
const discordService = require('./discordService');
const networkUtils = require('../utils/networkUtils');

exports.getAllDevices = async () => {
  return await Device.findAll();
};

exports.addDevice = async (device) => {
  const existingDevice = await Device.findOne({ where: { ipAddress: device.ipAddress } });

  if (!existingDevice) {
    const deviceWithDefaults = {
      ...device,
      os: device.os || 'Unknown', // Set 'Unknown' if OS field is not provided
      macAddress: device.macAddress || 'N/A' // Set 'N/A' if MAC address is not provided
    };

    const newDevice = await Device.create(deviceWithDefaults);
    discordService.sendNotification(`New device detected: ${device.deviceName}`);
    return newDevice;
  } else {
    // Existing device found, so no need to add again or send notification
    console.log(`Device with IP ${device.ipAddress} already exists.`);
    return existingDevice;
  }
};

exports.updateDevice = async (id, updates) => {
  const device = await Device.findByPk(id);
  if (!device) {
    throw new Error('Device not found');
  }
  await device.update(updates);
  return device;
};

exports.toggleNotifications = async (id, notificationsEnabled) => {
  const device = await Device.findByPk(id);
  if (!device) {
    throw new Error('Device not found');
  }
  await device.update({ notificationsEnabled });
  return device;
};

exports.deleteDevice = async (id) => {
  const device = await Device.findByPk(id);
  if (!device) {
    throw new Error('Device not found');
  }
  await device.destroy();
};

exports.startNetworkScanning = async () => {
  console.log('Starting network scanning...');
  setInterval(async () => {
    try {
      const devices = await networkUtils.scanNetworkDevices();
      devices.forEach(async (device) => {
        await exports.addDevice(device);
      });
    } catch (err) {
      console.error('Error scanning network:', err);
    }
  }, 60000); // Scan every 60 seconds (1 minute)
};
