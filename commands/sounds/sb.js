const Command = require(`${process.cwd()}/base/Command.js`);
const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
class Info extends Command {
  constructor(client) {
    super(client, {
      name: "sb",
      description: "Play the sounds of the list command by using it's index.",
      usage: "sb",
      aliases: ["sound"]
    });
  }
  async run(message, args, level) {
    var vChannel = message.member.voiceChannel;
    if (!vChannel) return message.reply(this.client.messages.noVoiceChannel);
    if (vChannel.members.has(this.client.user.id)) return message.reply(this.client.messages.alreadyPlaying);
    var i = args.join(' ') - 1;
    var sound = this.client.sounds[i]
    if (sound === undefined) return message.reply(this.client.messages.noValidSound);
    if(!vChannel) throw new Error("You must be in a voicechannel!")
    vChannel.join().then(connection => {
    const dispatcher = connection.play(ytdl(sound.url, { filter: 'audioonly' }));
    dispatcher.on('end', () => vChannel.leave());
  });
    return message.reply(this.client.messages.nowPlaying.replace("{0}", sound.title));
  }
}
module.exports = Info;