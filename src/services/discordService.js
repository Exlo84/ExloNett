// src/services/discordService.js
const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages] });
const config = require('../config/config');

client.login(config.discordBotToken);

exports.sendNotification = (message) => {
  const channel = client.channels.cache.get(config.discordChannelId);
  if (channel) {
    channel.send(message);
  }
};