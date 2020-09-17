import { Command } from "../config/command-config";
import { HelpCommand } from "./help/help";

interface CommandList {
    [key: string]: Command
}

export const BotCommands: CommandList = {
  Help: HelpCommand,
  // W2G: require('./w2g/w2g'),
  // FREE_GAMES: require('./free-games/free-games'),
  // PLAY: require('./yt-audio/play'),
  // STOP: require('./yt-audio/stop'),
  // SKIP: require('./yt-audio/skip')
};
