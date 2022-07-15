require('dotenv').config();

const { Client, Intents } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]})

const TOKEN = process.env.TOKEN;

const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async (msg) => {
   if (msg.content === "join") {
	   console.log("joining");
      const connection = joinVoiceChannel({
	      channelId: "883867547986952228",
         guildId: "883867547986952224",
         adapterCreator: msg.guild.voiceAdapterCreator,
         selfDeaf: false});
      console.log("joined from command");
   }

   if (msg.content === "leave") {
	   console.log("leaving");
      const connection = getVoiceConnection(msg.guild.id);

      if(!connection) return msg.channel.send("Not in voice channel");

      connection.destroy();

      console.log("left from command");
   }
})

// bot.on('voiceStateUpdate', (oldState, newState) => {
// 	console.log("oldState: " + oldState + "\tnewState: " + newState);
//    let guildId = newState.guild.id;
// 	let adapterCreator = newState.guild.voiceAdapterCreator;
//    let newUserChannel = newState.channelId;
//    let oldUserChannel = oldState.channelId;

//    if(newUserChannel === "883867547986952228") // don't remove ""
//    { 
//    // User Joins a voice channel
//       const connection = joinVoiceChannel({
//          channelId: newUserChannel,
//          guildId: guildId,
//          adapterCreator: adapterCreator,
//       selfDeaf: false});
//       console.log("Joined voice channel " + newUserChannel);
//    } else {
//    // User leaves a voice channel
//        const connection = getVoiceConnection(oldState.guild.id);
// 	   connection.disconnect();
//        connection.destroy();
//        console.log("Left voice channel " + oldUserChannel);
//    }
// });
