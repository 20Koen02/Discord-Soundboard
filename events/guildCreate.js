const snekfetch = require("snekfetch");
module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {
    this.client.logger.log(`New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
  }
};
