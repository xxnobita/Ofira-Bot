const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `clearqueue`,
  category: `Music`,
  aliases: [`clearqu`],
  description: `Cleares the Queue`,
  usage: `clearqueue`,
  cooldown: 10,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, guildData, player, prefix) => {
    try {
      //clear the QUEUE
      player.queue.clear();
      //Send Success Message
      const iii = new MessageEmbed()
      .setAuthor(`${message.author.tag} - Clearqueue`, message.author.displayAvatarURL( { dynamic: true } ))
      .setDescription(`${emoji.msg.SUCCESS} | The queue is now cleared.`)
      .setColor("#fd6260")
      return message.channel.send({embeds: [iii]});
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