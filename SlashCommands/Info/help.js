
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
  name: "help",
  category: "Info",
  description: "Shows The Help Menu Of The Bot",
  runslash: async (client, interaction, args, guildData, player, prefix) => {
    try {

      


      const mainmenu = new MessageEmbed()
        .setAuthor("Hype • Help Panel", ee.footericon)
        .setThumbnail(client.user.avatarURL())
        .setDescription(`A 24/7 Music Music Bot Which Aims To Provide High Quality Music To People Without Any Obstacles`)
        .addField(`● Config [3]`, `\`24/7\`, \`prefix\`, \`textchannel\``)
        .addField(`● Filters [6]`, `\`8d\`, \`bassboost\`, \`nightcore\`, \`daycore\`, \`reset\`, \`speed\``)
        .addField(`● Music [19]`, `\`autoplay\`, \`clearqueue\`, \`join\`, \`loop\`, \`nowplaying\`, \`pause\`, \`play\`, \`queue\`, \`remove\`, \`replay\`, \`resume\`, \`restart\`, \`resume\`, \`search\`, \`seek\`, \`shuffle\`, \`soundcloud\`, \`skip\`, \`skipto\`, \`stop\`, \`volume\``)
        .addField(`● Owner [4]`, `\`addcode\`, \`reload\`, \`eval\`, \`execute\``)
        .addField(`● Premium [3]`, `\`premium\`, \`redeem\`, \`validity\``)
        .addField(`● Info [6]`, `\`help\`, \`invite\`, \`node\`, \`ping\`, \`stats\`, \`uptime\``)
        .addField(`● Links [2]`, `[Invite Me](${config.links.opmusicinv}) | [Support Server](${config.links.server})`)
        .setColor(ee.color)



      interaction.reply({ embeds: [mainmenu] })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`An Error Occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``);
      return interaction.reply({ embeds: [emesdf] });
    }
  }
};