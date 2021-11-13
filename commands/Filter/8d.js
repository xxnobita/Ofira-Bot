const {
  MessageEmbed
} = require(`discord.js`);
const DBL = require('@top-gg/sdk');
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);

const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `8d`,
  category: `Filter`,
  aliases: [ ],
  description: `Applies a 8D Filter`,
  usage: `8d`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, guildData, player, prefix) => {
    try {

        const isPermGuild = require("../../models/premiumGuild");

      const isPremium = await isPermGuild.findOne({
             GuildID: message.guild.id,
           });
     
           if (!isPremium) {
             let noprem = new MessageEmbed()
             .setTitle(`No Premium Subscription`)
             .setDescription(`This This A Premium Command Dm developers To Buy Premium [ [ Free Till Verification ] ](${config.links.server})`)
              .setColor(ee.color) 

             message.reply({embeds : [noprem]})
           }
    if (isPremium) {
      player.node.send({
        op: "filters",
        guildId: message.guild.id,
        equalizer: player.bands.map((gain, index) => {
            var Obj = {
              "band": 0,
              "gain": 0,
            };
            Obj.band = Number(index);
            Obj.gain = Number(gain)
            return Obj;
          }),
          rotation: {
            "rotationHz": 0.2, 
        },
      });
      const df = new MessageEmbed()
      .setColor("#fd6260")
      .setAuthor(`${message.author.tag} - 8D`, message.author.displayAvatarURL( { dynamic: true } ))
      .setDescription(`${emoji.msg.SUCCESS} | 8d Is Now : \`Enabled\``)
      return message.channel.send({embeds: [df]});
    }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.message}\`\`\``);
      return message.channel.send({embeds: [emesdf]})
    }
  }
};