const Discord = require("discord.js");
const PREFIX = "!";

module.exports = {
    name: '8ball',
    description: "give you a random answer to your question",
    execute(msg, args){
    
    if(!args[2]) return message.reply("Please ask an actual qustion!");
    let replies = ["Yes.", "Never.", "Maybe someday"];

    let result = Math.floor((Math.random() * replies.length))
    let question = args.slice(1).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#FF9900")
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballembed);
    }
}