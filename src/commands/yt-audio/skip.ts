import VesuviusCommand from "../../models/vesuvius-command.class";

const skipExecute = () => (msg: any) => {
  const serverQueue = msg.client.queue.get(msg.guild.id);

  if (!msg.member.voice.channel)
    return msg.channel.send("You need to be in a voice channel to do that");
  if (!serverQueue) return msg.channel.send("There are no songs in the queue!");

  serverQueue.connection.dispatcher.end();
};

export = new VesuviusCommand(
  "skip",
  "Skip to next track in queue",
  skipExecute()
);
