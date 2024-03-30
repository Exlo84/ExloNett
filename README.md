# ExloNett: Network Monitoring and Management

ExloNett is a dynamic network monitoring tool designed to keep track of local network devices with a modern web UI and Discord integration for notifications. Built using JavaScript, it combines the power of real-time network scanning with the convenience of a web-based dashboard, allowing users to manage their local network devices efficiently.

## Key Features

- **Real-Time Network Monitoring**: Automatically discovers and keeps track of devices on the local network.
- **Web UI Dashboard**: A simple yet modern web interface for managing network devices and viewing real-time updates.
- **Discord Notifications**: Integration with Discord servers to send notifications about new and known devices, enhancing the monitoring experience.
- **Device Management**: Enables users to change device names, IDs, operating systems, and more directly from the web UI.
- **Notification Control**: Users can turn notifications on/off for each device, providing flexibility in how they receive updates.
- **Local Storage**: Utilizes SQLite for storing device information locally, ensuring quick access to historical data.

## Getting Started

### Prerequisites

- Nmap installed on your system for network scanning.
- Node.js for running the JavaScript backend.
- A Discord bot token if you wish to use Discord notifications.

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Configure your Nmap path in `scanManager.js` and set up your Discord bot token in the notification service configuration.
4. Start the application with `node src/index.js`. The web UI will be accessible from your browser.

## Usage

Navigate to the web UI to view the dashboard with real-time data on your local network devices. From here, you can manage device settings, view device history, and configure notifications.

To receive Discord notifications, ensure you've connected your Discord server following the setup guide included in the documentation.

## Technologies Used

- **JavaScript**: For the core application logic.
- **Express**: For the web server and API.
- **SQLite**: For local storage of device data.
- **Nmap**: For network scanning and device discovery.
- **Discord.js**: For sending notifications to a Discord server.

## Contributing

We welcome contributions to ExloNett! Please feel free to fork the repository, make your changes, and submit a pull request.

## License

ExloNett is released under the MIT License. See the LICENSE file for more details.
