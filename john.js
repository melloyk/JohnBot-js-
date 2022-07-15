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

bot.on('voiceStateUpdate', (oldState, newState) => {
   // voiceStateUpdate from bot itself, ignore
   if (oldState.id === "992247238187303034" || newState.id === "992247238187303034") {
    return;  
   }

   let guildId = newState.guild.id;
	let adapterCreator = newState.guild.voiceAdapterCreator;
   let newUserChannel = newState.channelId;
   let oldUserChannel = oldState.channelId;

   // member joins voice channel alone, bot not already in a voice channel
   if (newState.channel.members.size == 1 && !getVoiceConnection(newState.guild.id)) {
      const connection = joinVoiceChannel({
         channelId: newUserChannel,
         guildId: guildId,
         adapterCreator: adapterCreator,
      selfDeaf: false});
      console.log("Joined voice channel " + newUserChannel);
   }  // second member joins voice channel with sole member and bot
   else if (newState.channel.members.size > 1 && getVoiceConnection(newState.guild.id) && newState.channelId == bot.voice.connection.channelId) {
      const connection = getVoiceConnection(newState.guild.id);
      connection.destroy();
      console.log("Left voice channel " + newUserChannel);
   }  // last member left voice channel that bot was in
   else if (oldState.channel.members.size == 0 && bot.voice.connections.size == 1 && oldState.channelId == bot.voice.connection.channelId) {
      const connection = getVoiceConnection(oldState.guild.id);
      connection.destroy();
      console.log("Left voice channel " + oldUserChannel);
   }

   // if (newUserChannel === "883867547986952228")
   // { 
   // // User Joins a voice channel
   //    const connection = joinVoiceChannel({
   //       channelId: newUserChannel,
   //       guildId: guildId,
   //       adapterCreator: adapterCreator,
   //    selfDeaf: false});
   //    console.log("Joined voice channel " + newUserChannel);
   // } else {
   // // User leaves a voice channel
   //    const connection = getVoiceConnection(oldState.guild.id);
	  //  connection.destroy();
   //    console.log("Left voice channel " + oldUserChannel);
   // }
});
