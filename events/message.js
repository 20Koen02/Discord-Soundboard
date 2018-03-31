module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot || !message.guild) return;
    if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
    
    const defaults = this.client.settings.get("default");
    const settings = message.guild ? this.client.getSettings(message.guild.id) : defaults;
    message.settings = settings;
    
    const level = this.client.permlevel(message);

    const mentionPrefix = new RegExp(`^<@!?${this.client.user.id}> `);
    const prefixMention = mentionPrefix.exec(message.content);

    const prefixes = [settings.prefix, `${prefixMention}`];
    let prefix = false;
  
    for (const thisPrefix of prefixes) {
      if (message.content.toLowerCase().indexOf(thisPrefix) == 0) prefix = thisPrefix;
    }
  
    if (message.content.match(new RegExp(`^<@!?${this.client.user.id}>$`))) {
      return message.channel.send(`The prefix is \`${settings.prefix}\`.`);
    }
  
    if (!prefix) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
    
    if (!cmd) return;

    const rateLimit = await this.client.ratelimit(message, level, cmd.help.name, cmd.conf.cooldown); 

    if (typeof rateLimit == "string") {
      this.client.logger.log(`${this.client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) got ratelimited while running command ${cmd.help.name}`);
      return message.channel.send(`Please wait ${rateLimit.toPlural()} to run this command.`); 
    }

    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

    if (level < this.client.levelCache[cmd.conf.permLevel]) {
        return;
    }
      
    message.author.permLevel = level;

    message.flags = [];
    while (args[0] &&args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
    
    this.client.logger.log(`${this.client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
    cmd.run(message, args, level);
  }
};