require('dotenv').config();

const { Client, Intents } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]})

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  const channel = bot.channels.cache.get("883867547986952228");
  channel.join().then(connection => {
    console.log("Successfully connected.");
  }).catch(e => {
    console.error(e);
  });
});

bot.on('voiceStateUpdate', (oldState, newState) => {
    let newUserChannel = newState.channelID;
    let oldUserChannel = oldState.channelID;

    if(newUserChannel === "883867547986952228") //don't remove ""
    { 
       // User Joins a voice channel
       console.log("Joined vc with id "+newUserChannel);
       newUserChannel.join();
    }
    else{
       // User leaves a voice channel
       console.log("Left vc");
       oldUserChannel.leave();
    }
});