const nmap = require('node-nmap');
nmap.nmapLocation = "C:\\Program Files (x86)\\Nmap\\nmap.exe";

exports.scanNetworkDevices = () => {
  return new Promise((resolve, reject) => {
    // Using -O for OS detection, and -sV to determine service/version info
    // This might require sudo privileges on some systems
    let osAndVersionScan = new nmap.OsAndPortScan('192.168.1.0/24');

    osAndVersionScan.on('complete', (data) => {
      const devices = data.map(device => {
        // Attempt to refine device name if the hostname is 'Unknown Device'
        const deviceName = device.hostname === 'Unknown Device' && device.vendor ? `${device.vendor} Device` : device.hostname;
        return {
          ipAddress: device.ip,
          deviceName: deviceName || 'Unknown Device',
          os: device.osNmap ? device.osNmap : 'Unknown',
          macAddress: device.mac || 'N/A' // Assuming that 'mac' will be present; adjust as needed
        };
      });
      resolve(devices);
    });

    osAndVersionScan.on('error', (error) => {
      console.error('Nmap scan failed:', error);
      reject(error);
    });

    osAndVersionScan.startScan();
  });
};
