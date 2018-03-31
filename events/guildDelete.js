const snekfetch = require("snekfetch");
module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {
    this.client.settings.delete(guild.id);
    this.client.reminders.findAll("guildid", guild.id).forEach((i) => {
      if (guild.id === i.guildid) this.client.reminders.delete(`${i.id}-${i.reminderTimestamp}`);
    });
    this.client.logger.log(`A guild has been left: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
  }
};
