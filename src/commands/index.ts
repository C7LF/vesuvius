import { Command } from "../config/command-config";
import { HelpCommand } from "./help/help";
import { FreeGames } from "./free-games/free-games";
import { WatchTogether } from "./w2g/w2g";

interface CommandList {
  [key: string]: Command;
}

export const BotCommands: CommandList = {
  Help: HelpCommand,
  FREE_GAMES: FreeGames,
  W2G: WatchTogether,
  // FREE_GAMES: require('./free-games/free-games'),
  // PLAY: require('./yt-audio/play'),
  // STOP: require('./yt-audio/stop'),
  // SKIP: require('./yt-audio/skip')
};
