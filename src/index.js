// index.js

const { startNmapScan, stopNmapScan } = require('./scanManager');
const server = require('./server'); // Assuming this sets up your Express app
const config = require('./config');

const startServer = () => {
  server.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
    startNmapScan();
  });

  // Graceful shutdown logic
  const shutdown = () => {
    console.log('Shutting down application...');
    stopNmapScan();
    server.close(() => {
      console.log('Server shut down.');
      process.exit(0);
    });
  };

  // Handle various termination signals
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

startServer();
