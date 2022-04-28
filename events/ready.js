const Discord = require("discord.js");
const config = require('../config.js');
module.exports = async client => {
  client.user.setPresence({ activity: { type: "WATCHING", name: `${config.activity}`}, status: 'online' })
};

/*
Bot Status - idle, dnd, online
*/
