const {Client, RichEmbed} = require('discord.js')
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

bot.on('ready', () =>{
    console.log('Ascension is Online! Bot Version: ' + BotVersion);

    bot.user.setActivity('for !help', {type: 'LISTENING'})
    
})

bot.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");


    switch(args[0]){
        case 'help':

            var helpEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Ascension Help')
            .addField('Music', '!play (with yt link), !skip , !stop');

            msg.reply(helpEmbed);

    }



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




        case 'skip':

            var server = servers[msg.guild.id]; 

            if(server.dispatcher) server.dispatcher.end();
            msg.channel.send('⏩, Skipping the song!');

            score = score+1;

        break;

        case 'stop':
            var server = servers[msg.guild.id]; 

            if(msg.guild.voiceConnection){
                for(var i = server.queue.length - 1; i>=0; i--){
                    server.queue.splice(i, 1);
                }

                server.dispatcher.end();
                msg.channel.send('🛑, Ending the queue leaving the voice channel!')
                console.log('stopped the queue');
            }

            if(msg.guild.connection) msg.guild.voiceConnection.disconnect();

        break;
    }

    switch(args[0]){
        case "poll":
            var pollembed = new Discord.MessageEmbed()
            .setColor(0xFFC300)
            .setTitle("Initiate Poll")
            .addField('md!poll', ' to initiate a simple yes or no poll');

            if(!args[1]){
                msg.reply(pollembed)
            }

            let msgArgs = args.slice(1).join(' ');

            msg.reply(msgArgs).then(messageReaction =>{
                messageReaction.react("👍");
                messageReaction.react("👎");
            })

        break;
    }

})

