const {Discord , Client, MessageEmbed, Collection, RichEmbed, execute} = require('discord.js')
const bot = new Client();
const request = require('request');
const async = require('async');
bot.login(process.env.token);
const PREFIX = "!";
const ytdl = require("ytdl-core");
const ffmpeg = require("ffmpeg-static");
var servers = {};
var connection = {};
var BotVersion = '0.0.2';
var score = '10';

const fs = require('fs');
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.on('ready', () =>{
    console.log('Ascension is Online! Bot Version: ' + BotVersion);

    bot.user.setActivity('for !help', {type: 'LISTENING'})
    
})

bot.on('message', msg=>{

    let args = msg.content.substring(PREFIX.length).split(' ')


    switch(args[0]){
        case 'nono':
           bot.commands.get('nono').execute(msg, args);
        break;
        case 'help':
            bot.commands.get('help').execute(msg, args);
        break;
        case 'play':
            bot.commands.get('play').execute(msg, args);
        break;
        case 'skip':
    //        bot.commands.get('skip').execute(msg, args);
        break;
        case 'stop':
 //           bot.commands.get('stop').execute(msg, args);
        break;
        
    }


   
})

