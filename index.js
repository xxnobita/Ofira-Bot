const Discord = require("discord.js"); 
const { Intents, WebhookClient , Collection} = require("discord.js");
const app = require("express")
const colors = require("colors"); 
const fs = require("fs"); 
require('discord-reply'); 
const config = require("./botconfig/config.json");
const fetch = require("node-fetch");
const mongoose = require("mongoose")
const { findOrCreateGuild } = require("./handlers/functions")
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/904628803639337012/hIWJjokAXlMfLFgs_9HNjhtqB06_lg_vfL6qJuiTVo2Yg98fS2Iq8Q_YGwAN1pY7Max6' }); ////lele bsdk
const { readdirSync } = require("fs")

const intents = new Intents([ // include all non-privileged intents, would be better to specify which ones you actually need
  "GUILD_MEMBERS" // lets you request guild members (i.e. fixes the issue)
]);

const client = new Discord.Client({
  intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES, 
      Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
      Discord.Intents.FLAGS.GUILD_WEBHOOKS,
      Discord.Intents.FLAGS.GUILD_INVITES,
      Discord.Intents.FLAGS.GUILD_VOICE_STATES,
      Discord.Intents.FLAGS.GUILD_PRESENCES,
        
    ],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  presence: {
    status: "idle",
    activities: [{
      name: "@Hype Music", //#fd6260
      type: "LISTENING"
    }]
  },
allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]

});


require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);

//Loading files, with the client variable like Command Handler, Event Handler, ...
["clientvariables", "command", "events", "erelahandler", "slashhandler"].forEach(handler => { 
  require(`./handlers/${handler}`)(client);
});

//Each Database gets a own file and folder which is pretty handy!
client.databaseCache = {};
client.guildsData = require("./models/Guild"); // Guild mongoose model
client.databaseCache.guilds = new Discord.Collection();


//login into the bot
mongoose.connect(config.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  }).then(() => {
  //login to the bot
  client.login(config.token)




client.on("voiceStateUpdate", async (oldState, newState) => {
    if (newState.channelId && newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress) {
        try {
            await newState.guild.me.voice.setSuppressed(false);
        } catch (e) {
            console.log(e)
        }
    }
})





client.on('guildCreate', async (guild) => {
  try {
    const owner = await guild.fetchOwner()
    const embed = new Discord.MessageEmbed()           
    .setTitle("Joined A New Server")
    .setColor("GREEN")
    .setThumbnail(guild.iconURL())
    .setDescription("Hey Developer Look! I've Joined A New Server !!")
    .addField("**Server Name**", guild.name, true)
    .addField("**Server ID**", guild.id, true)
    .addField("**Owner**", `Tag - ${owner.user.tag}\nID - ${owner.id}`, true)
    .addField("**Members**", `${guild.memberCount} + <@812605686583394304>`, true)
    try { embed.addField("**Region**", guild.region, true) } catch {/** */}
    client.channels.cache.get("886278649148485722").send({embeds: [embed]})
  } catch (e) { console.log(e) }
});
client.on('guildCreate', async (guild) => {
  try {
    const guildData = await findOrCreateGuild(client, { id: guild.id });
    let prefix = guildData.prefix;
    //if not in the database for some reason use the default prefix
    if (prefix === null) prefix = config.prefix;
    guildData.announce = true;
    guildData.save();
  
    let ch = guilg.fetchOwner()
    const texts = "If you need help, feel free to join our support server at " + config.links.server;
    const guildembed = new Discord.MessageEmbed()
    .setTitle("Thank you for adding me in your server! ❤️")
    .setColor("GREEN")

    .setDescription(`\`\`\`fix\nMy prefix here is ${prefix}\nYou can see a list of commands by typing ${prefix}help or ${prefix}commands\nYou can change my prefix using ${prefix}prefix <New Prefix>\`\`\``);
    ch.send({content: texts, embeds: [guildembed]});
  } catch {/** */}
});
client.on('guildDelete', async (guild) => {
  try {
    const owner = await guild.fetchOwner()
    const embed = new Discord.MessageEmbed()
    .setTitle("Leaved A Server")
    .setColor("RED")
    .setThumbnail(guild.iconURL())
    .setDescription("Hey Developers Look! Someone kicked me from their server !!")
    .addField("**Server Name**", guild.name, true)
    .addField("**Owner**", `Tag - ${owner.user.tag}\nID - ${owner.id}`, true)
    .addField("**Members**", `${guild.memberCount} - <@812605686583394304>`, true)
    try { embed.addField("**Region**", guild.region, true) } catch {/** */}
  
    client.channels.cache.get("886278649148485722").send({embeds: [embed]})  
  } catch (e) { console.log(e) }
});


 



     
 });




process.on('unhandledRejection', (error) => {
  web.send(`\`\`\`js\n${error.stack}\`\`\``)
  console.log(error)
});
process.on("uncaughtException", (err, origin) => {
  web.send(`\`\`\`js\n${err}\`\`\``)
  console.log(err)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  web.send(`\`\`\`js\n${err}\`\`\``)
  console.log(err)
});
process.on('beforeExit', (code) => {
  web.send(`\`\`\`js\n${code}\`\`\``)
  console.log(code)
});
process.on('exit', (code) => {
  web.send(`\`\`\`js\n${code}\`\`\``)
  console.log(code)
});
process.on('multipleResolves', (type, promise, reason) => {
}); 

//uhh