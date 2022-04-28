const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("croxydb")
const moment = require("moment")
const conf = require('../config.js');
const a = require('../config.js');

module.exports.run = async (client, message, args) => {

if (!message.member.roles.cache.has(conf.helper) && !message.member.hasPermission("ADMINISTRATOR")) {
message.channel.send(motiEmbed.setDescription(`${conf.no} | **You do not have the necessary privileges to use this command!**`))
message.react(conf.no);
return;
};

let motiEmbed = new Discord.MessageEmbed().setColor(conf.color).setFooter(conf.footer).setTimestamp().setAuthor("Top Acknowledgments List", message.author.avatarURL({dynamic: true}))
let embed = motiEmbed;

let top =  message.guild.members.cache.filter(uye => db.get(`thankPoint.${uye.id}`)).array().sort((uye1, uye2) => Number(db.get(`thankPoint.${uye2.id}`))-Number(db.get(`thankPoint.${uye1.id}`))).slice(0, 15).map((uye, index) => ` \`${index+1}.\` ${uye} - **${db.get(`thankPoint.${uye.id}`)}** there are thank you points :coin:`).join('\n')
    
message.channel.send(motiEmbed.setDescription(`${top || "**Nobody got a thank you!**"}`)).catch(console.error)
message.react(conf.yes)
return;
}

exports.config = {
  name: "top",
  guildOnly: true,
  aliases: ["thank-top"],
};
