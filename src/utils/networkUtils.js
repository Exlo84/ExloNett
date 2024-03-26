// utils/networkUtils.js
const nmap = require('node-nmap');

exports.scanNetworkDevices = async () => {

  try {
    const scanResult = await nmap.run({
        range: '192.168.1.1/24',
        ports: '80,443',
    });

    const devices = [];

    for (const host of scanResult) {
      const address = host.ip;
      if (host.hostname) {
        devices.push({
          ipAddress: address,
          deviceName: `${host.hostname[0]} Device`,
          openPorts: host.openPorts,
        });
      }
    }

    return devices;

  } catch (err) {
    console.error('Nmap scan failed:', err);
    return [];
  }
};