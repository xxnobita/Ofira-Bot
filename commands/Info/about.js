const { MessageEmbed } = require("discord.js");
const emoji = require(`../../botconfig/emojis.json`);
const embed = require(`../../botconfig/embed.json`);


module.exports = {
    name: "about",
    description: "About",
    category: "Info",
    run: async (client, message, args, guildData, player, guild) => {
        let premium = new MessageEmbed()
        .setAuthor(`${message.author.tag} - About`,  message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(
`
**Hype Music's**
\`\`\`asciidoc
Team Members :: ~ R A H U L, 
ððð \` K E N I C H IÂ¹Â²Â¹,
 ~ Ù´ð¶ððððððª, 
 â´½ÎãWÎä¸¶Î²HÎ©Î©T, 
 Î¶ÍÍ¡ðiyusHð¥
\`\`\`
`
)
.setColor(`#fd6260`) 

message.channel.send({embeds: [premium]})
    }
}