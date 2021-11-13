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
𝐃𝐗𝐓 \` K E N I C H I¹²¹,
 ~ ٴ𝑶𝒄𝒆𝒂𝒏🌙𓆪, 
 ⴽΛ〆WΛ丶βHΩΩT, 
 ζ͜͡𝐏iyusH🥀
\`\`\`
`
)
.setColor(`#fd6260`) 

message.channel.send({embeds: [premium]})
    }
}