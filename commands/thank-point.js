const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("croxydb")
const moment = require("moment")
const conf = require('../config.js');

module.exports.run = async (client, message, args) => {

if (!message.member.roles.cache.has(conf.helper) && !message.member.hasPermission("ADMINISTRATOR")) {
message.channel.send(motiEmbed.setDescription(`${conf.no} | **You do not have the necessary privileges to use this command!**`))
message.react(conf.no);
return;
};

let motiEmbed = new Discord.MessageEmbed().setColor(conf.color).setFooter(conf.footer).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
let embed = motiEmbed;

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
                                                                        
message.channel.send(motiEmbed.setDescription(`
${member}'s thank you stats:

> **Total Acknowledgments:** \`${db.fetch(`thankCount.${member.id}`) || "0"}.\`
> **Total Acknowledgment Points:** \`${db.fetch(`thankPoint.${member.id}`) || "0"}.\`
`)).catch(console.error)
};

exports.config = {
  name: "point",
  guildOnly: false,
  aliases: ["thank-point"],
};