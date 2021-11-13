const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `nowplaying`,
  category: `Music`,
  aliases: [`np`, `current`],
  description: `Shows information about the current Song`,
  usage: `nowplaying`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, guildData, player, prefix) => {
    try{
      //if no current song return error
      if (!player.queue.current) {
        const no = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} There is nothing playing`)
        return message.channel.send({embeds: [no]})
      }
      //Send Now playing Message
      const np = new MessageEmbed()
      .setAuthor(`${message.author.tag} - Now Playing`, message.author.displayAvatarURL( { dynamic: true } ))
      .setURL(player.queue.current.uri)
      .setColor("#fd6260")
     
      .setTitle(`${player.queue.current.title}`)
      .setDescription(`${createBar(player)}`)
      return message.channel.send({embeds: [np]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
			const emesdf = new MessageEmbed()
			.setColor(ee.wrongcolor)
			.setAuthor(`An Error Occurred`)
			.setDescription(`\`\`\`${e.message}\`\`\``);
			return message.channel.send({embeds: [emesdf]});
    }
  }
};
