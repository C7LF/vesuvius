const { createRoom } = require('../../services/create-room')
const { prefix } = require('../../config/command-config')

module.exports = {
    name: `${prefix}w2g`,
    description: 'Create a temporary watch together room',
    paramsRequired: true,
    async execute(msg, args, params) {

        let mes = 'https://w2g.tv/rooms/'
        
        msg.suppressEmbeds(true)
        await createRoom(params).then(response => mes += response.streamkey)
        msg.channel.send(mes)
    }
}

