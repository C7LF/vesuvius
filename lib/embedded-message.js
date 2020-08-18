const Discord = require('discord.js')

class EmbeddedMessage {
    constructor() {
        const DefaultEmbeddedMessage = new Discord.MessageEmbed()
        .addField('\u200b', '──────────────────────')
        .setFooter('Lord and Saviour', 'https://i.imgur.com/wSTFkRM.png')
        return DefaultEmbeddedMessage
    }
}

module.exports = EmbeddedMessage