const Command = require(`${process.cwd()}/base/Command.js`);
const { MessageEmbed } = require('discord.js');
class List extends Command {
  constructor(client) {
    super(client, {
      name: "list",
      description: "Gives all the sounds you can play.",
      usage: "list"
    });
  }
  async run(message, args, level) {
    let index = 0;
  const listEmbed = new MessageEmbed()
    .setColor(message.settings.goodcolor)
    .setFooter("Requested by: " + message.author.username, message.author.avatarURL())
    .addField("All Sounds", `${this.client.sounds.map(s => `**${++index}:** ${s.title}`).join("\n")}`);
  return message.channel.send({ embed: listEmbed });
  }
}
module.exports = List;