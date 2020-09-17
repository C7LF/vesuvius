const EpicFreeGames = require('../../index')
const { prefix } = require('../../config/command-config')


module.exports = {
    name: `${prefix}fg`,
    description: 'Displays list of current free games on Epic',
    async execute(msg, args) {
        msg.channel.send(EpicFreeGames.EpicFreeGames)
    }
}


