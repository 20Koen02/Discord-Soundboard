const Command = require(`${process.cwd()}/base/Command.js`);
const { MessageEmbed } = require('discord.js');
class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Shows all commands.",
      category: "System",
      usage: "help [command]",
      aliases: ["h", "halp"]
    });
  }
  async run(message, args, level) {
  if (!args[0]) {
    const settings = message.settings;
    
    const myCommands = message.guild ? this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level) : this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
    
    const commandNames = myCommands.keyArray();
    
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    let currentCategory = "";
    let output = `__**Help Page**__\n*Do ${settings.prefix}help <command> for more command info*\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach(c => {
      const cat = c.help.category.toProperCase();
        if (currentCategory !== cat) {
          output += `__**${cat}**__\n`;
          currentCategory = cat;
        }
        output += `${settings.prefix}${c.help.name}\n`;
    });
    const helpEmbed = new MessageEmbed().setColor("#00ff00").setFooter('Requested by: ' + message.author.username, message.author.avatarURL()).setDescription(output);        
    message.channel.send({ embed:helpEmbed });
  } else {
    let command = args[0];
    if (this.client.commands.has(command)) {
        command = this.client.commands.get(command);
        if (level < this.client.levelCache[command.conf.permLevel]) return;
        const embed = new MessageEmbed()
        .setColor(message.settings.goodcolor)
        .setFooter('Requested by: ' + message.author.username, message.author.avatarURL())
        .setAuthor(command.help.name, this.client.user.avatarURL())
        .addField(`Description`, command.help.description)
        .addField(`Usage`, command.help.usage)
        .addField(`Aliasses`, command.conf.aliases.join(", "))
        message.channel.send(embed);
        //message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\nalises:: ${command.conf.aliases.join(", ")}`, {code:"asciidoc"});
    }
  }
    
  }
}
module.exports = Help;