const {
  MessageEmbed,
  splitMessage
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  inspect
} = require(`util`);
module.exports = {
  name: `eval`,
  category: `Owner`,
  aliases: [`evaluate`],
  description: `eval Command`,
  usage: `eval <CODE>`,
  run: async (client, message, args, guildData, player, prefix) => {
    if (!config.ownerIDS.includes(message.author.id)) {
      const nope = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setDescription(`${emoji.msg.ERROR} You are not allowed to run this command! Only Developers are allowed to run this command`)
      return message.channel.send({embeds: [nope]})
    }
    if (!args[0]) {
      let idk = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setDescription(`${emoji.msg.ERROR} You have to at least include one evaluation arguments`);
      return message.channel.send({embeds: [idk]})
    }

    try {

       const code = args.join(" ");
      if (!code) {
        return message.channel.send("What do you want to evaluate?");
      }
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      let input = new MessageEmbed()
     

         let result = new MessageEmbed()
        .addField("RESULTS", `\`\`\`${evaled}\`\`\``)
        .setColor("#303037");

      message.channel.send({ embeds: [result] });

    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.message}\`\`\``);
      return message.channel.send({embeds: [emesdf]});
    }
  },
};