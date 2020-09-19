import { Command, prefix } from "../../config/command-config";

export const StopCommand: Command = {
    name: `${prefix}stop`,
    description: 'Stop the songs in the queue',
    execute(msg: any, args): void {
        const serverQueue = msg.client.queue.get(msg.guild.id);
        
        if (!msg.member.voice.channel) return msg.channel.send('You have to be in a voice channel to stop the music!');
        
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
}