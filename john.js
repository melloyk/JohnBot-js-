require('dotenv').config();

const { Client, Intents } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]})

const TOKEN = process.env.TOKEN;

const { adapterCreator } = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('voiceStateUpdate', (oldState, newState) => {
    let guildId = newState.guildId;
	let adapterCreaaaaaaator = newState.guild.voiceAdapterCreator();
    let newUserChannel = newState.channelId;
    let oldUserChannel = oldState.channelId;
	console.log(guildId + " " + newUserChannel + " " + adapterCreaaaaaaator);

    if(newUserChannel === "883867547986952228") //don't remove ""
    { 
       // User Joins a voice channel
       console.log("Joined vc with id " + newUserChannel);
       const connection = joinVoiceChannel(newUserChannel, guildId, adapterCreaaaaaaator);
    }
    else{
       // User leaves a voice channel
       console.log("Left vc");
       oldUserChannel.leave();
    }
});
