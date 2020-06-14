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
    name: 'stop',
    description: "stops the music from whenever",
    execute(msg, args){

        
        switch(args[0]){

        case 'stop':
        var server = servers[msg.guild.id];
        server.queue.shift();
        if(msg.guild.voiceConnection){
        for(var i = server.queue.length - 1; i>=0; i--){
        server.queue.splice(i, 1);
        }

        server.dispatcher.end();
        msg.channel.send('🛑, Ending the queue leaving the voice channel!')
        console.log('stopped the queue');
        }

        if(!servers[msg.guild.id]) servers[msg.guild.id] = {
            queue: []
            }

        if(msg.guild.connection) msg.guild.voiceConnection.disconnect();
        break;
        }

    }
}