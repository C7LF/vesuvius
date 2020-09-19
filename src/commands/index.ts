import { Command } from "../config/command-config";
import { HelpCommand } from "./help/help";
import { FreeGames } from "./free-games/free-games";
import { WatchTogether } from "./w2g/w2g";
import { PlayCommand } from './yt-audio/play'

interface CommandList {
  [key: string]: Command;
}

export const BotCommands: CommandList = {
  Help: HelpCommand,
  FREE_GAMES: FreeGames,
  W2G: WatchTogether,
  PLAY: PlayCommand
  // STOP: require('./yt-audio/stop'),
  // SKIP: require('./yt-audio/skip')
};
