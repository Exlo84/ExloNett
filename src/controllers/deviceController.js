// src/controllers/deviceController.js
const deviceService = require('../services/deviceService');

exports.getAllDevices = async (req, res) => {
  try {
    const devices = await deviceService.getAllDevices();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addDevice = async (req, res) => {
  try {
    const device = await deviceService.addDevice(req.body);
    res.status(201).json(device);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDevice = async (req, res) => {
  const { id } = req.params;
  const { deviceName, os, macAddress } = req.body; // Extract fields that can be updated

  try {
      const device = await Device.findByPk(id);
      if (device) {
          await device.update({ deviceName, os, macAddress }); // Update the device with new details
          res.json(device); // Send back the updated device information
      } else {
          res.status(404).send('Device not found');
      }
  } catch (error) {
      console.error('Error updating device:', error);
      res.status(500).send('Error updating device');
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    await deviceService.deleteDevice(req.params.id);
    res.json({ message: 'Device deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};