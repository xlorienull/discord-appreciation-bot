const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("croxydb")
const moment = require("moment")
const conf = require('../config.js');

module.exports.run = async (client, message, args) => {

if (!message.member.roles.cache.has(conf.owner)) {
message.channel.send(motiEmbed.setDescription(`${conf.no} | **You do not have the necessary privileges to use this command!**`))
return;
}

message.reply(`You have successfully reset the database!`)
db.delete(`thankCount`)
db.delete(`thankPoint`)
db.delete(`thank`)
}
exports.config = {
  name: "database-delete",
  guildOnly: false,
  aliases: [],
};
