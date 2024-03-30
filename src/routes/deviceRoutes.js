const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController'); // Make sure this path is correct
const { updateDeviceOsInfo } = require('../scanManager'); // Adjust path as necessary, if used

// Trigger OS information update
router.post('/update-devices-os', (req, res) => {
    updateDeviceOsInfo();
    res.send("Update process started. Check console for progress.");
});

// Get all devices
router.get('/', deviceController.getAllDevices);

// Add a new device
router.post('/', deviceController.addDevice);

// Toggle Enable/Disable
router.post('/toggle-notification/:id', deviceController.toggleNotification);

// Update a specific device by ID
router.put('/:id', deviceController.updateDevice);

// Delete a specific device by ID
router.delete('/:id', deviceController.deleteDevice);

module.exports = router;
