import  Discord from 'discord.js'

export default class EmbeddedMessage extends Discord.MessageEmbed {
    constructor() {
        super()
        let DefaultEmbeddedMessage = new Discord.MessageEmbed()
        // .addField('\u200b', '──────────────────────')
        // .setFooter('Lord and Saviour')
        return DefaultEmbeddedMessage
    }
}