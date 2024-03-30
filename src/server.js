const http = require('http');
const app = require('./app');
const socketio = require('socket.io');
const { startNmapScan, updateDeviceOsInfo } = require('./scanManager');

startNmapScan();

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('A client connected');

  // Handle device updates
  socket.on('updateDevice', (device) => {
    deviceService.updateDevice(device);
    io.emit('deviceUpdated', device);
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

module.exports = server;