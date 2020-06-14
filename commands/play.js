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
    name: 'play',
    description: "Plays rthe music from start",
    execute(msg, args){

        
        switch(args[0]){

        case 'play':
        msg.channel.send('✅ Okay, Adding song to queue! 👍')
        score = score+1;
        function play(connection, msg){
        var server = servers[msg.guild.id];
        server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioandvideo"}));
        score = score+1;
        server.queue.shift();
        server.dispatcher.on("end", function(){
        if(server.queue[0]){
        play(connection, msg);
        }else{
        connection.disconnect();
        }
        })
        }

        if(!args[1]){
        msg.channel.send("❌, You need to provide a link!")
        return;
        }

        if(!msg.member.voiceChannel){
        msg.channel.send('❌, You must be in a channel to play the bot!')
        return;
        }

        if(!servers[msg.guild.id]) servers[msg.guild.id] = {
        queue: []
        }

        var server = servers[msg.guild.id];
        server.queue.push(args[1]);
        if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection){
        play(connection, msg);
        })
        break;

    }

    }
}