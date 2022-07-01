require('dotenv').config();

const { Client, Intents } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]})

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('voiceStateUpdate', (oldState, newSTate) => {
	let newUserChannel = newMember.channelID;
       let oldUserChannel = oldMember.channelID;
    
       if(newUserChannel === "883867547986952228") //don't remove ""
       { 
           // User Joins a voice channel
           console.log("Joined vc with id "+newUserChannel);
       }
       else{
           // User leaves a voice channel
           console.log("Left vc");
       }
});