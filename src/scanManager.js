const { exec } = require('child_process');
const fs = require('fs');
const xml2js = require('xml2js');
const { Device } = require('./models/deviceModel'); // Adjust path as necessary
let nmapProcess = null;

const parser = new xml2js.Parser();

const startNmapScan = () => {
 if (nmapProcess) {
    console.log('Nmap scan is already running.');
    return;
 }

 console.log('Starting Nmap scan...');
 const nmapPath = '"C:\\Program Files (x86)\\Nmap\\nmap.exe"';
 const command = `${nmapPath} -O -oX output.xml 192.168.1.1/24`;

 nmapProcess = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Nmap scan error: ${error.message}`);
      nmapProcess = null;
      return;
    }
    if (stderr) {
      console.error(`Nmap scan stderr: ${stderr}`);
      nmapProcess = null;
      return;
    }
    console.log('Nmap scan completed successfully.');
    console.log(stdout);
    nmapProcess = null;
    // Parse the output XML file after scan completion
    parseNmapOutput();
 });
};

const stopNmapScan = () => {
    if (nmapProcess) {
        console.log('Stopping Nmap scan...');
        nmapProcess.kill('SIGINT');
        nmapProcess = null;

        // Check if the output.xml file exists and is not empty
        fs.stat('output.xml', (err, stats) => {
            if (err || stats.size === 0) {
                console.error('Nmap scan results are incomplete or corrupted.');
                // Handle the incomplete results (e.g., retry the scan, notify the user, etc.)
            } else {
                console.log('Nmap scan results are complete.');
                // Proceed with processing the scan results
            }
        });
    } else {
        console.log('No Nmap scan is currently running.');
    }
}

function parseNmapOutput() {
    console.log('Parsing Nmap output XML...');
    fs.readFile('output.xml', function(err, data) {
        if (err) {
            console.error("Error reading Nmap output file:", err);
            return;
        }
        
        parser.parseString(data, async function (err, result) {
            if (err) {
                console.error("Error parsing XML:", err);
                return;
            }
            console.log("Nmap output parsed successfully.");
            // Process the parsed result to update devices
            updateDeviceOsInfo(result);
        });
    });
}

function updateDeviceOsInfo(parsedResult) {
    const hosts = parsedResult.nmaprun.host || [];
    hosts.forEach(async (host) => {
        const ipAddress = host.address[0].$.addr;
        // Extract the OS information
        const os = host.os && host.os.osmatch && host.os.osmatch[0].$.name;
        
        // Extract the MAC address
        const macAddressEntry = host.address.find(address => address.$.addrtype === 'mac');
        const macAddress = macAddressEntry ? macAddressEntry.$.addr : 'N/A'; // Use 'N/A' if MAC address is not found
        
        // Extract the vendor as a fallback for the device name
        const vendor = macAddressEntry ? macAddressEntry.$.vendor : 'Unknown'; // Use 'Unknown' if vendor is not found
        
        // Use the vendor as the device name if the device name is not present or is empty
        let deviceName = '';
        if (host.hostnames && host.hostnames.hostname && host.hostnames.hostname.length > 0) {
            deviceName = host.hostnames.hostname[0].$.name;
        }
        if (!deviceName || deviceName.trim() === '') {
            deviceName = vendor;
        }
        
        // Update device in the database
        try {
            await Device.update({ os, deviceName, macAddress }, { where: { ipAddress } });
            console.log(`Updated device info for device with IP: ${ipAddress}`);
        } catch (updateError) {
            console.error("Error updating device info:", updateError);
        }
    });
}

module.exports = { startNmapScan, stopNmapScan };