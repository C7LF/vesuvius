import { TextChannel, DMChannel, NewsChannel, VoiceChannel } from "discord.js";
import { Song } from "./song.model";

export interface QueueContruct {
    textChannel: TextChannel | DMChannel | NewsChannel;
    voiceChannel: VoiceChannel;
    connection: null;
    songs: Array<Song>;
    volume: number;
    playing: boolean;
  }