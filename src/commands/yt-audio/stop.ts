import { prefix } from "../../config/command-config";
import { Command } from "../../models";

const StopCommand: Command = {
  name: `${prefix}stop`,
  description: "Stop the songs in the queue",
  execute(msg: any): void {
    const serverQueue = msg.client.queue.get(msg.guild.id);

    if (!serverQueue) return msg.channel.send("No song playing, fool!");

    if (!msg.member.voice.channel)
      return msg.channel.send(
        "You have to be in a voice channel to stop the music!"
      );

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  },
};

export = StopCommand;
