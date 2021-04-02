import { prefix } from "../../config/command-config";
import { Command } from "../../models";

const SkipCommand: Command = {
  name: `${prefix}skip`,
  description: "Skip to next track in queue",
  execute(msg: any): void {
    const serverQueue = msg.client.queue.get(msg.guild.id);

    if (!msg.member.voice.channel)
      return msg.channel.send("You need to be in a voice channel to do that");
    if (!serverQueue)
      return msg.channel.send("There are no songs in the queue!");

    serverQueue.connection.dispatcher.end();
  },
};

export = SkipCommand;
