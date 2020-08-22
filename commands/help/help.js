const commands = require('../commands')

const EmbeddedMessage = require('../../lib/embedded-message')

const helpMessage = new EmbeddedMessage()
    .setTitle('Available Commands')
    .setColor('#ea0000')

Object.values(commands).forEach(cmd => helpMessage.addField(cmd.command, cmd.description))

module.exports = helpMessage