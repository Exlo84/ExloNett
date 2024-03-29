// src/controllers/deviceController.js
const deviceService = require('../services/deviceService');

exports.toggleNotification = async (req, res) => {
  try {
    const { id } = req.params;
    // This function should toggle the notification status and return the updated device
    const device = await deviceService.toggleNotifications(id);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    return res.json(device);
  } catch (error) {
    console.error('Error toggling notification:', error);
    return res.status(500).json({ error: error.message });
  }
};

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
  const updates = req.body; // Assume all body properties are valid updates

  try {
      const updatedDevice = await deviceService.updateDevice(id, updates);
      if (updatedDevice) {
          res.json(updatedDevice); // Send back the updated device information
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
