const {Discord , Client, RichEmbed} = require('discord.js')
const bot = new Client();
module.exports = {
    name: 'help',
    description: "Displays the Help Menu",
    execute(msg, args){

        const helpEmbed = new RichEmbed()           
        .setColor('R%ANDOM')
        .setTitle('Ascension Help')
        .addField('Future Home', 'of Help')

       msg.reply(helpEmbed)

    }
}