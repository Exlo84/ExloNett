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
  try {
    const device = await deviceService.updateDevice(req.params.id, req.body);
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: err.message });
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