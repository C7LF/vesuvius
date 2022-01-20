import VesuviusCommand from "../../models/vesuvius-command.class";

const stopExecute = () => (msg: any) => {
  const serverQueue = msg.client.queue.get(msg.guild.id);
  if (!serverQueue) return msg.channel.send("No song playing, fool!");
  if (!msg.member.voice.channel)
    return msg.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
};

export = new VesuviusCommand(
  "stop",
  "Stop the songs in the queue",
  stopExecute()
);
