// File: src/scanManager.js
const { exec } = require('child_process');
let nmapProcess = null;

exports.startNmapScan = () => {
  if (nmapProcess) {
    console.log('Nmap scan is already running.');
    return;
  }
  
  console.log('Starting Nmap scan...');
  // Set the full path to your Nmap executable if not in the system PATH
  const nmapPath = '"C:\\Program Files (x86)\\Nmap\\nmap.exe"';
  const command = `${nmapPath} -oX output.xml 192.168.1.0/24`;

  nmapProcess = exec(command, (error) => {
    if (error) {
      console.error(`Nmap scan error: ${error}`);
    } else {
      console.log('Nmap scan completed successfully.');
    }
    nmapProcess = null;
  });
};

exports.stopNmapScan = () => {
  if (nmapProcess) {
    console.log('Stopping Nmap scan...');
    nmapProcess.kill('SIGINT');
    nmapProcess = null;
  } else {
    console.log('No Nmap scan is currently running.');
  }
};
