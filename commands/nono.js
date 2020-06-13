const bot = new Client();
const {Discord , Client, RichEmbed} = require('discord.js')
module.exports = {

    
    name: 'nono',
    description: "Says the creator name",
    execute(msg, args){

        const nonoEmbed = new RichEmbed()           
        .setColor(0x2AFF00)
        .setTitle('Magical Dreams: NONO(stacker_nono)')
        .addField('Is he the best?', 'Duno, maybe?')
        .addField('Needs to learn more JS', 'YESS')

       msg.reply(nonoEmbed)


    }
}