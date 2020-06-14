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

module.exports = {
    name: 'skip',
    description: "skips the music",
    execute(msg, args){

        
        switch(args[0]){

        case 'skip':
        var server = servers[msg.guild.id];
        if(server.dispatcher) server.dispatcher.end();
        msg.channel.send('⏩, Skipping the song!');
        score = score+1;

        

        break;

        }

    }
}