// src/routes/deviceRoutes.js
const express = require('express');
const deviceController = require('../controllers/deviceController');
const router = express.Router();

// Get all devices
router.get('/', deviceController.getAllDevices);

// Add a new device
router.post('/', deviceController.addDevice);

// Update a specific device by ID
router.put('/:id', deviceController.updateDevice);

// Delete a specific device by ID
router.delete('/:id', deviceController.deleteDevice);

module.exports = router;
