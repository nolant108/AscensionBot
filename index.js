const {Discord , Client, MessageEmbed} = require('discord.js')
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

bot.on('message', msg=>{

    let args = msg.content.substring(PREFIX.length).split(' ')

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
        case 'queue':

            const queueEmbed = new RichEmbed()
            .setColor(0xFFC300)
            .setTitle("Music Queue")
            .addField('⬇️ Queue ⬇️', server.queue);

            msg.channel.send(queueEmbed)

            score = score+1;

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
            const pollembed = new RichEmbed()
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
 
    switch(args[0]){
        case 'server':


     //       if(!args[1]) return message.channel.send('You must type a minecraft server ip')
        //    if(!args[2]) return message.channel.send('You must type a minecraft server port')
 
            ping('magicaldreams.us', 25565, (error, resonse) =>{
                if(error) throw error

                const serverEmbed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle('Server Status')
                .addField('Server IP', "magicaldreams.us")
                .addField('Server Version', "1.15.2")
                .addField('Online players', resonse.onlinePlayers)
                .addField('Max Players', resonse.maxPlayers)
               msg.reply("Here you go, :) ")
               msg.reply(serverEmbed)

               score = score+1;

               console.log(score)

            })
        break
 
    }

    switch(args[0]){
        case 'help':

            const helpEmbed = new RichEmbed()
            .setColor(0xF0FF00)
            .setTitle('Magical Dreams: Help')
            .addField('Server Status', "md!server")
            .addField('Create A Poll', 'md!poll')
            .addField('Music', 'md!play (with yt link), md!skip , md!stop     ----Join #Music to listen----')
            .addField('Managers', "managers")
            .addField('Apply for Staff', "app , apply , application")
            .addField('Server Ip', 'ip,  server ip')
            .addField('Staff Commands', 'md!admin')
            .addField('About MDBot', 'md!about')
            .addField("People Bio's",'md!chums, md!cole, md!kindal, md!nono , md!marlin, md!kara, md!bode , md!ben, md!65, md!mik')

           msg.channel.send(helpEmbed)
           score = score+1;

           console.log(score)
    }

    switch(args[0]){
        case 'about':
           score = score+1;

           const aboutEmbed = new RichEmbed()
            .setColor(0x2AFF00)
            .setTitle('Magical Dreams: About')
            .addField('Current Build Version', "v1.5.7")
            .addField('Current Score Since Build', score)
            .addField('Author', "nono(stacker_nono)")
            .addField('Website', 'https://github.com/nolant108')

           msg.reply(aboutEmbed)
           console.log(score)
    }


    switch(args[0]){
        case 'admin':

            if(!msg.member.roles.find(r => r.name === "Tod")){
                        score = score+1;
                console.log(score)
                const adminEmbed = new RichEmbed()
                .setColor(0x2AFF00)
                .setTitle('Magical Dreams: Admin Settings')
                .addField('Current Build Version3', "hello")
            }else{

                score = score+1;
                console.log(score)

                msg.reply('YOU DO NOT HAVE PERMISSIONS').then(msg => msg.delete(10000))
            }
    
              break;
    }

    switch(args[0]){
        case 'nono':
           score = score+1;

           const nonoEmbed = new RichEmbed()           
            .setColor(0x2AFF00)
            .setTitle('Magical Dreams: NONO(stacker_nono)')
            .addField('Is he the best?', 'Duno, maybe?')
            .addField('Needs to learn more JS', 'YESS')

           msg.reply(nonoEmbed)
           console.log(score)
    }

    switch(args[0]){
        case 'kindal':
           score = score+1;

           const kindalEmbed = new RichEmbed()
            .setColor(0x2AFF00)
            .setTitle('Magical Dreams: MakingMiners')
            .addField('Bio', 'We keep moving forward, opening new doors, and doing new things, because were curious and curiosity keeps leading us down new paths. Oh and by the way.. I’m Kindal tehe')
            .addField('I say...', 'Useless')


           msg.reply(kindalEmbed)
           console.log(score)
    }

    switch(args[0]){
        case 'marlin':
           score = score+1;

           const marlinEmbed = new RichEmbed()            .setColor(0x2AFF00)
            .setTitle('Magical Dreams: Marlin')
            .addField('Google Sign In: Someone just signed into your computer, do you know them?', "Yes I know him, He's me.")
            .addField('Have a great weekend!', 'I Hope your code behaves on Monday the same way it did on Friday')

           msg.reply(marlinEmbed)
           console.log(score)
    }

    
    switch(args[0]){
        case 'chums':
           score = score+1;

           const chumsEmbed = new RichEmbed()            .setColor(0x2AFF00)
            .setTitle('Magical Dreams: chums122')
            .addField('Yoda says', 'Only Just Begun, The meme war has')
            .addField('Did you ever hear the Tragedy of Darth Plagueis the wise?'
            , ' I thought not. Its not a story the Jedi would tell you. Its a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Its ironic he could save others from death, but not himself.')


           msg.reply(chumsEmbed)
           console.log(score)
    }

switch(args[0]){
    case 'cole':
       score = score+1;

       const coleEmbed = new RichEmbed()       
        .setColor(0x2AFF00)
        .setTitle('Magical Dreams: starport75')
        .addField('Kat Coordinator...', 'Cole is the other cool kat coordinator')       
        .addField('He is a theatre boi...', 'Cole wants to seize the day :newspaper2:')

       msg.reply(coleEmbed)
       console.log(score)
}

switch(args[0]){
    case 'ben':
       score = score+1;

       const benEmbed = new RichEmbed()
        .setColor(0x2AFF00)
        .setTitle('Magical Dreams: Ben[OhBen]')
        .addField('Ben is...', 'an awesome ride technician and trainer')
        .addField('Ben is...', 'an awesome ride technician and trainer!!!')
        .addField('Ride breaks down...', 'coffin dance plays')

       msg.reply(benEmbed)
       console.log(score)
}

switch(args[0]){
    case '65':
       score = score+1;

       const sixfiveEmbed = new RichEmbed()    
           .setColor(0x2AFF00)
        .setTitle('Magical Dreams: 65Thomas')
        .addField('65 Thomas is...', 'out to lunch.')
        .addField('He’s always hungry...', 'so it might take a minute.')
        .addField('Unless you have a cookie....', 'Then he’ll come running.')

       msg.reply(sixfiveEmbed)
       console.log(score)
}

    switch(args[0]){
        case 'mik':
           score = score+1;

           const mikEmbed = new RichEmbed()
                       .setColor(0xBD00FF)
            .setTitle('Magical Dreams: Mik (kozzy913)')
            .addField('Bee Movie?', 'Barry says "Ya like Jazz?"')
            .addField('According to all known laws of aviation,'
            , 'there is no way a bee should be able to fly.')


           msg.reply(mikEmbed)
           console.log(score)
    }


    switch(args[0]){
        case 'bode':
           score = score+1;

           const bodeEmbed = new RichEmbed()
            .setColor(0x2AFF00)
            .setTitle('Magical Dreams: Bode (Disneyland_)')
            .addField('Whomst', 'Iz Bode')
            .addField('and BTW', 'You Just got Vectored')


           msg.reply(bodeEmbed)
           console.log(score)
    }

    switch(args[0]){
        case 'kara':
           score = score+1;

           const karaEmbed = new RichEmbed()            .setColor(0x2AFF00)
            .setTitle('Magical Dreams: Kara (_Kara)')
            .addField('kara is a cool kat coordinator', 'kara is a cool kat coordinator!!!!!!!!')
            .addField('And She is...', 'A Dancing Queen')
            .addField('kara gets the', 'limo out front')
            .addField("Server Mom!!", "Kara is the server mom, lol")


           msg.reply(karaEmbed)
           console.log(score)
    }

    if(msg.content === 'website'){

        msg.reply('Here is the website: https://magicaldreams.us/');
        score = score+1;

        console.log(score)
    }


    

    if(msg.content === 'website?'){

        msg.reply('Here is the website: https://magicaldreams.us/');
        score = score+1;

        console.log(score)
    }

    

    if(msg.content === 'app'){

        msg.reply('About a 2 week waiting period, here is the website: https://magicaldreams.us/apply/');
        score = score+1;

        console.log(score)
    }
    
        if(msg.content === 'apply'){

        msg.reply('About a 2 week waiting period, here is the website: https://magicaldreams.us/apply/');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'app?'){

        msg.reply('About a 2 week waiting period, here is the website: https://magicaldreams.us/apply/');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'application'){

        msg.reply('About a 2 week waiting period, here is the website: https://magicaldreams.us/apply/');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'ip'){

        msg.reply('Server ip is: magicaldreams.us');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'server ip'){

        msg.reply('Server ip is: magicaldreams.us');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'shamu'){

        msg.reply(':happy: :happy: :happy: :happy: :happy: :happy: :happy: :happy: :happy: :happy: :happy:(cant to cross emojis) ');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'managers'){

        msg.reply('Current Managers are: Chums122, DreamBig02, MakingMiners, Rei_Arch, Starport75');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'who are the managers'){

        msg.reply('Current Managers are: Chums122, DreamBig02, MakingMiners, Rei_Arch, Starport75');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'Good morning!'){

        msg.reply('Morning to you too! :)');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'morning'){

        msg.reply('Morning to you too! :) ');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'morning!'){

        msg.reply('Morning to you too! :) ');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'Morning!'){

        msg.reply('Morning to you too! :) ');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'Morning'){

        msg.reply('Morning to you too! :) ');
        score = score+1;

        console.log(score)
    }

    if(msg.content === 'im good how are you'){

        msg.reply('I am going well, thanks for asking! :)');
        score = score+1;

        console.log(score)
    }

    //----------------------swear filter-----------------------

/*
    let wordArray = msg.content.split(" ");
    console.log(wordArray);
    let filterWords = ['fuck', 'shit', 'hell', '$h!t', 'asshole', 'son of a bitch', 'bitches'];
    for(var i = 0; 1 < filterWords.length; i++) {
        msg.delete();
        msg.channel.send('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
            
    }
*/








    if(msg.content === 'fuck'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'Fuck'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'testing fucking swear filter'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'fuck me'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    
    if(msg.content === 'Fuck'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'shit'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'hell'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === '$h!T'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === '$h!t'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'asshole'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }

    if(msg.content === 'son of a bitch'){

        score = score+1;
        console.log(score)
        msg.delete(10)
        msg.reply('You are not allowed to say that here! Our team has been notified and this incident has been logged.')
        .then(msg => msg.delete(10000))
    }


























    
     //----------------------Discord Logger-----------------------

     //start of message updating
    
    
    bot.on("Update", async(oldMessage, newMessage)=>{
        if(oldMessage.content == newMessage.content){
            return;
        }       
        const ReportEmbed = new RichEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
      //  .setThumbnail(oldMessage.author.avatarURL)
        .setColor("0x00A6FF")
        .setDescription("A message from a user was edited.")
        .addField("Before", oldMessage.content)
        .addField("After", newMessage.content)
        .setFooter("Message Logger 2020 © MagicalDreams")
    


        let loggingChannel = newMessage.guild.channels.find(ch => ch.name === "bot-log")

        loggingChannel.send(ReportEmbed);
        score = score+1;
        console.log(score)

    }, 2/10000)
    //end of message updating

    bot.on('close', () => {
        connection.removeAllListeners();
    });

})

