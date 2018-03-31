const Command = require(`${process.cwd()}/base/Command.js`);
const { MessageEmbed } = require('discord.js');
class Info extends Command {
  constructor(client) {
    super(client, {
      name: "info",
      description: "Shows information about the bot.",
      usage: "info"
    });
  }
  async run(message, args, level) {
    if(message.settings.delete === true) message.delete();
    const infoEmbed = new MessageEmbed()
    .setColor(message.settings.goodcolor)
    .setFooter('Requested by: ' + message.author.username, message.author.avatarURL())
    .addField(`Developers`, `**• Project Leader:** ${this.client.users.get('255009837002260482').tag}\n**• Project Helpers:** ${this.client.users.get('209609796704403456').tag}, ${this.client.users.get('260107579366047744').tag}`)
    .addField(`Bot Stats`, `**• Guilds:** ${this.client.guilds.size}\n**• Members:** ${this.client.users.size}`);
    return message.channel.send({ embed: infoEmbed })
  }
}
module.exports = Info;