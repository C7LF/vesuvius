import { prefix } from "../../config/command-config";
import ytdl from "ytdl-core";

import { Song, QueueContruct, CommandPlay } from "../../models";

export const PlayCommand: CommandPlay = {
  name: `${prefix}play`,
  description: "Play audio from YouTube video",
  async execute(msg: any, args) {
    try {
      const validYoutubeRegex = /((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))[\S]+/;
      const isValidArgs = args && args[0] && args[0].match(validYoutubeRegex);

      if (!isValidArgs) {
        return msg.channel.send("Invalid arguments!");
      }
      const queue = msg.client.queue;
      const serverQueue = msg.client.queue.get(msg.guild?.id);

      const voiceChannel = msg.member?.voice.channel;
      if (!voiceChannel)
        return msg.channel.send(
          "You need to be in a voice channel to play music!"
        );
      const permissions = voiceChannel.permissionsFor(msg.client.user);
      if (!permissions?.has("CONNECT") || !permissions.has("SPEAK")) {
        return msg.channel.send("I need the permissions to join and speak!");
      }

      if (!args) {
        return msg.channel.send("Please enter a URL!");
      }

      const songInfo = await ytdl.getInfo(args[0]);
      const song: Song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
      };

      if (!serverQueue) {
        const queueContruct: QueueContruct = {
          textChannel: msg.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
        };

        queue.set(msg.guild?.id, queueContruct);

        queueContruct.songs.push(song);

        try {
          let connection = await voiceChannel.join();
          queueContruct.connection = connection;
          this.play(msg, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(msg.guild?.id);
          return msg.channel.send(err);
        }
      } else {
        serverQueue.songs.push(song);
        return msg.channel.send(
          `**${song.title}** has been added to the queue!`
        );
      }
    } catch (error) {
      console.log(error);
      msg.channel.send(error.msg);
    }
  },

  play(msg: any, song: Song) {
    const queue = msg.client.queue;
    const guild = msg.guild;
    const serverQueue = queue.get(msg.guild?.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild?.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url, { quality: "highestaudio", highWaterMark: 1 << 25 }))
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(msg, serverQueue.songs[0]);
      })
      // TODO?: potentially repeat play steps if video metadata error occurs, try 5 times?
      .on("error", (error: any) => {
        msg.channel.send("Error playing");
        console.error(error);
      });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Started playing: **${song.title}**`);
  },
};
