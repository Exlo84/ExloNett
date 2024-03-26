// index.js

const app = require('./app');
const server = require('./server');
const config = require('./config');

function startServer() {

  server.listen(config.port)
    .on('listening', () => {
      console.log(`Server listening on port ${config.port}`);
    })
    .on('error', err => {
      console.error(err);
      // additional error handling
    });

}

startServer();