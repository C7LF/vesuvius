const { prefix } = require('../../config/command-config')
const ytdl = require('ytdl-core');

module.exports = {
    name: `${prefix}play`,
    description: 'Play audio from YouTube video',
    paramsRequired: true,
    async execute(msg, args) {
        try {
          const queue = msg.client.queue;
          const serverQueue = msg.client.queue.get(msg.guild.id);
    
          const voiceChannel = msg.member.voice.channel;
          if (!voiceChannel)
            return msg.channel.send(
              "You need to be in a voice channel to play music!"
            );
          const permissions = voiceChannel.permissionsFor(msg.client.user);
          if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return msg.channel.send(
              "I need the permissions to join and speak in your voice channel!"
            );
          }
    
          const songInfo = await ytdl.getInfo(args[0]);
          const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
          };
    
          if (!serverQueue) {
            const queueContruct = {
              textChannel: msg.channel,
              voiceChannel: voiceChannel,
              connection: null,
              songs: [],
              volume: 5,
              playing: true
            };
    
            queue.set(msg.guild.id, queueContruct);
    
            queueContruct.songs.push(song);
    
            try {
              var connection = await voiceChannel.join();
              queueContruct.connection = connection;
              this.play(msg, queueContruct.songs[0]);
            } catch (err) {
              console.log(err);
              queue.delete(msg.guild.id);
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
    
      play(msg, song) {
        const queue = msg.client.queue;
        const guild = msg.guild;
        const serverQueue = queue.get(msg.guild.id);
    
        if (!song) {
          serverQueue.voiceChannel.leave();
          queue.delete(guild.id);
          return;
        }
    
        const dispatcher = serverQueue.connection
          .play(ytdl(song.url))
          .on("finish", () => {
            serverQueue.songs.shift();
            this.play(msg, serverQueue.songs[0]);
          })
          .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(`Started playing: **${song.title}**`);
      }
}