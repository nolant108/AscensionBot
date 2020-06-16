const {Discord , Client, RichEmbed} = require('discord.js')
const bot = new Client();
module.exports = {
    name: 'help',
    description: "Displays the Help Menu",
    execute(msg, args){

        const helpEmbed = new RichEmbed()           
        .setColor('RANDOM')
        .setTitle('Ascension Help')
        .addField('Music', '!play (YT Link), !skip, !stop, !8ball')

       msg.reply(helpEmbed)

    }
}