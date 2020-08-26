const { prefix } = require('../../config/command-config')

module.exports = {
    name: `${prefix}help`,
    description: 'Displays list of available commands',
    execute(msg, args) {
        msg.channel.send(helpMessage)
    }
}

const EmbeddedMessage = require('../../shared/embedded-message')

const helpMessage = new EmbeddedMessage()
    .setTitle('Available Commands')
    .setColor('#ea0000')

const commands = require('../index')

Object.values(commands).forEach(cmd => helpMessage.addField(cmd.name, cmd.description))
