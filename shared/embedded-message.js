const Discord = require('discord.js')

class EmbeddedMessage {
    constructor() {
        const DefaultEmbeddedMessage = new Discord.MessageEmbed()
        // .addField('\u200b', '──────────────────────')
        // .setFooter('Lord and Saviour')
        return DefaultEmbeddedMessage
    }
}

module.exports = EmbeddedMessage