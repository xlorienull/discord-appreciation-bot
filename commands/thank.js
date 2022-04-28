const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("croxydb")
const conf = require('../config.js');
const a = require('../config.js');
const moment = require("moment");
require("moment-duration-format")

module.exports.run = async (client, message, args) => {

let motiEmbed = new Discord.MessageEmbed().setColor(conf.color).setFooter(conf.footer).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
let embed = motiEmbed;

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if (!member) {
message.channel.send(motiEmbed.setDescription(`${conf.no} | **You must specify a valid member!**`)).then(message => message.delete({ timeout: 15000 })).catch(console.error)
message.react(a.no);  
return;
};

if (member.user.bot) {
message.channel.send(motiEmbed.setDescription(`${conf.no} | **You can't thank bots!**`)).then(message => message.delete({ timeout: 15000 })).catch(console.error)
message.react(a.no);  
return;
};

if (member.id === message.author.id) {
message.channel.send(motiEmbed.setDescription(`${conf.no} | **You can't thank yourself!**`)).then(message => message.delete({ timeout: 15000 })).catch(console.error)
message.react(a.no);  
return;
};

if (conf.helper.some(h => member.roles.cache.has(h))) {
if (db.has(`${message.author.id}.${member.user.id}`) && db.get(`${message.author.id}.${member.user.id}`) < Date.now()) {
db.delete(`${message.author.id}.${member.user.id}`);
} else if (db.has(`${message.author.id}.${member.user.id}`) && db.get(`${message.author.id}.${member.user.id}`) >= Date.now()) {
message.channel.send(embed.setDescription(`${member} **To thank the Moderator** \`${moment.duration(db.get(`${message.author.id}.${member.user.id}`) - Date.now()).format("D [day] H [hour] m [minute] h [second]")}\` **wait.**` ));
return;
}
db.add(`thank.${member.id}`, 1);
db.push(`thank.${member.id}`, {üye: "thank", üye: message.author.id})
db.add(`thankPoint.${member.id}`, 10)
message.channel.send(motiEmbed.setDescription(`User ${message.author} thanked ${member}! ❤️`)).catch(console.error)
db.set(`${message.author.id}.${member.user.id}`, Date.now() + (15 * 60 * 60 * 1000));

} else {
message.channel.send(motiEmbed.setDescription(`${conf.no} | **You cannot thank any not-Moderator user!**`)).then(message => message.delete({ timeout: 15000 })).catch(console.error)
}
};

exports.config = {
  name: "thank",
  guildOnly: true,
  aliases: ["thank-you"],
};

