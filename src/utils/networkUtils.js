const nmap = require('node-nmap');
nmap.nmapLocation = "C:\\Program Files (x86)\\Nmap\\nmap.exe";

exports.scanNetworkDevices = () => {
  return new Promise((resolve, reject) => {
    let quickScan = new nmap.QuickScan('192.168.1.0/24');

    quickScan.on('complete', (data) => {
      const devices = data.map((device) => {
        return {
          ipAddress: device.ip,
          deviceName: device.hostname || 'Unknown Device',
          os: 'Unknown', // Placeholder, as nmap's OS detection might require more advanced scanning
          macAddress: device.mac || 'Unknown' // Adjust based on actual data structure
        };
      });
      resolve(devices);
    });

    quickScan.on('error', (error) => {
      console.error('Nmap scan failed:', error);
      reject(error);
    });

    quickScan.startScan();
  });
};
