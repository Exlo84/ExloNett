const nmap = require('node-nmap');
nmap.nmapLocation = "C:\\Program Files (x86)\\Nmap\\nmap.exe"; // Adjust as necessary

exports.scanNetworkDevices = () => {
  return new Promise((resolve, reject) => {
    let quickScan = new nmap.QuickScan('192.168.1.1/24');

    quickScan.on('complete', (data) => {
      const devices = data.map(device => ({
        ipAddress: device.ip,
        deviceName: device.hostname || 'Unknown Device',
        os: device.osNmap || 'Unknown', // Assuming osNmap holds the OS info
        macAddress: device.mac || 'N/A', // Adjust based on actual data
        lastSeen: new Date() // Capture the last seen timestamp
      }));
      resolve(devices);
    });

    quickScan.on('error', (error) => {
      console.error('Nmap scan failed:', error);
      reject(error);
    });

    quickScan.startScan();
  });
};
