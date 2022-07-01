require('dotenv').config();

const Discord = require('discord.js');

const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('voiceStateUpdate', (oldState, newSTate) => {
	let newUserChannel = newMember.channelID;
       let oldUserChannel = oldMember.channelID;
    
       if(newUserChannel === "Channel id here") //don't remove ""
       { 
           // User Joins a voice channel
           console.log("Joined vc with id "+newUserChannel);
       }
       else{
           // User leaves a voice channel
           console.log("Left vc");
       }
});