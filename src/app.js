// app.js
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const deviceRoutes = require('./routes/deviceRoutes');
const { sequelize } = require('./models/deviceModel');
const deviceService = require('./services/deviceService');

const app = express();

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/devices', deviceRoutes);

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced successfully');
  // Start network scanning after database sync
  deviceService.startNetworkScanning();
});

module.exports = app;