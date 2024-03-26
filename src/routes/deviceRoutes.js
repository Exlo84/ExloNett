// src/routes/deviceRoutes.js
const express = require('express');
const deviceController = require('../controllers/deviceController');
const router = express.Router();

router.get('/', deviceController.getAllDevices);
router.post('/', deviceController.addDevice);
router.put('/:id', deviceController.updateDevice);
router.delete('/:id', deviceController.deleteDevice);

module.exports = router;