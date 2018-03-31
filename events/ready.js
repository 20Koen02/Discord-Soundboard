const { get } = require("snekfetch");
module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {

    await this.client.wait(1000);

    if (!this.client.settings.has("default")) {
      if (!this.client.config.defaultSettings) throw new Error("defaultSettings not preset in config.js or settings database. Bot cannot load.");
      this.client.settings.set("default", this.client.config.defaultSettings);
    }
    
    this.client.user.setActivity(presence[0]);
  var i = 1;
  setInterval(() => {
    if (i === presence.length) i = 0;
    this.client.user.setActivity(presence[i]);
    i++;
  }, 120000);
    this.client.logger.log(`Soundboard started:`, "ready")
    this.client.logger.log(` - ${this.client.users.size} Users`, "ready");
    this.client.logger.log(` - ${this.client.channels.size} Channels`, "ready");
    this.client.logger.log(` - ${this.client.guilds.size} Guilds`, "ready");
  }
};
const presence = [
  "Dank Sounds",
  "?help",
  "Default Prefix: ?",
  "Annoying Sounds",
  "?info",
  "Weird Tunes",
  "Cool Beats",
  "?help for help"
];
