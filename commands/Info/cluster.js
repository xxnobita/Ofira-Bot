
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
  name: "cluster",
  category: "Info",
  description: "Lund Lelo",
  run: async (client, message, args, guildData, player, prefix) => {
const memusage = process.memoryUsage();


const shardInfo = await client.shard.broadcastEval(c => ({
			id: c.shard.ids,
			status: c.shard.mode,
			guilds: c.guilds.cache.size,
			channels: c.channels.cache.size,
			members: c.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0),
			memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
			players: c.manager.players.size,
			ping: c.ws.ping,
		}));

		const emee = new MessageEmbed()
			.setAuthor(`${message.author.tag} - Clusters`,  message.author.displayAvatarURL({ dynamic: true }))
            .setColor(ee.color);


            
		shardInfo.forEach(i => {
			console.log(i)

			const status = i[1] === 'process' ? "<:offline:881485288919154698>" : "<:online:859781426143428608>" ;

			emee.addField(`${status} Cluster ${(parseInt(i.id) + 1).toString()}`, `
\`\`\`asciidoc
Shards         :: ${(parseInt(i.id) + 1).toString()}/${client.shard.count}
Servers        :: ${i.guilds.toLocaleString()}
Channels       :: ${i.channels.toLocaleString()}
Users          :: ${i.members.toLocaleString()}
Memory         :: ${Number(i.memoryUsage).toLocaleString()}mb
Ping           :: ${i.ping.toLocaleString()}ms
Streams        :: ${i.players.toLocaleString()}
\`\`\``, true);
		});


			


message.channel.send({
    embeds: [emee]
})

  }
}