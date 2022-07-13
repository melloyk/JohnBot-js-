require('dotenv').config();

const { Client, Intents } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]})

const TOKEN = process.env.TOKEN;

const { CreateVoiceConnectionOptions } = require('@discordjs/voice');
const { JoinVoiceChannelOptions } = require('@discordjs/voice');

const { joinVoiceChannel, createAudioPlayer, generateDependencyReport } = require('@discordjs/voice');

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('voiceStateUpdate', (oldState, newState) => {
    let guildId = newState.guild.id;
	let adapterCreator = newState.guild.voiceAdapterCreator;
    let newUserChannel = newState.channelId;
    let oldUserChannel = oldState.channelId;
    let connection = null;

    if(newUserChannel === "883867547986952228") //don't remove ""
    { 
       // User Joins a voice channel
      connection = joinVoiceChannel({
         channelId: newUserChannel,
         guildId: guildId,
         adapterCreator: adapterCreator});
    } else{
       // User leaves a voice channel
       connection.destroy();
    }
});
