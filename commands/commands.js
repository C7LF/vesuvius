const prefix = '.'

const commands = { 
    FREE_GAMES: {
        command: `${prefix}fg`,
        description: 'Displays list of current free games on Epic'
    },
    HELP: {
        command: `${prefix}help`,
        description: 'Displays list of available commands'
    }
}

module.exports = commands