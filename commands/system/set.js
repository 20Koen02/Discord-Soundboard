const Command = require(`${process.cwd()}/base/Command.js`);
const { MessageEmbed } = require('discord.js');

class Set extends Command {
  constructor(client) {
    super(client, {
      name: "set",
      description: "View or change settings for your server.",
      category: "Utilities",
      usage: "set <reset/view/edit> <key> <value>",
      aliases: ["setting", "settings"]
    });
  }

  async run(message, [action, key, ...value], level) { // eslint-disable-line no-unused-vars

    const settings = message.settings;
    const defaults = this.client.settings.get("default");
    if(!message.member.permissions.has('MANAGE_GUILD') && !message.author.id == "255009837002260482") return message.reply(this.client.messages.noConfigPerms);
  
    if (action === "edit") {
      if (!key) return message.reply("Please specify a key to edit");
      if (!settings[key]) return message.reply("This key does not exist in the settings");
      if (value.length < 1) return message.reply("Please specify a new value");
    
      settings[key] = value.join(" ");

      this.client.settings.set(message.guild.id, settings);
      message.reply(`${key} successfully edited to ${value.join(" ")}`);
    } else
  
    if (action === "reset") {
      if (!key) return message.reply("Please specify a key to delete (reset).");
      if (!settings[key]) return message.reply("This key does not exist in the settings");
      
      const filter = m => m.author.id === message.author.id;
      const response = await this.client.awaitReply(message, `Are you sure you want to reset \`${key}\` to the default \`${defaults[key]}\`? Respond with \`y\` or \`yes\``, filter, undefined, null);

      if (["y", "yes"].includes(response)) {

        delete settings[key];
        this.client.settings.set(message.guild.id, settings);
        message.reply(`${key} was successfully reset to default.`);
      } else

      if (["n","no","cancel"].includes(response)) {
        message.reply(`Your setting for \`${key}\` remains at \`${settings[key]}\``);
      }
    } else {
      /*const array = [];
      Object.entries(settings).forEach(([key, value]) => {
        array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`= Current Guild Settings =
${array.join("\n")}`, {code: "asciidoc"});
*/
      var embed = await this.settingList(message.settings, message);
      message.channel.send({ embed });
    }
  }
  settingList(settings, msg) {
  const embed = new MessageEmbed()
    .setColor(settings.goodcolor)
    .setFooter("Requested by: " + msg.author.username, msg.author.avatarURL())
    .addField("Config overview", `
**Prefix:** ${settings.prefix}
**Goodcolor:** ${settings.goodcolor}
**Badcolor:** ${settings.badcolor}
**Delete:** ${settings.delete}`);
  return embed;
  }
}

module.exports = Set;
