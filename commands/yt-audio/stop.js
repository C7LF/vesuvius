const { prefix } = require('../../config/command-config')

module.exports = {
    name: `${prefix}stop`,
    description: 'Stop the songs in the queue',
    execute(msg, args) {
        const serverQueue = msg.client.queue.get(msg.guild.id);
        
        if (!msg.member.voice.channel) return msg.channel.send('You have to be in a voice channel to stop the music!');
        
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
}