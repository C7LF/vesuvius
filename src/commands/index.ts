import { Command } from "../models/command.model";
import { HelpCommand } from "./help/help";
import { FreeGames } from "./free-games/free-games";
import { WatchTogether } from "./w2g/w2g";
import { PlayCommand } from './yt-audio/play'
import { StopCommand } from "./yt-audio/stop";
import { SkipCommand } from "./yt-audio/skip";

interface CommandList {
  [key: string]: Command;
}

export const BotCommands: CommandList = {
  Help: HelpCommand,
  FREE_GAMES: FreeGames,
  W2G: WatchTogether,
  PLAY: PlayCommand,
  STOP: StopCommand,
  SKIP: SkipCommand
};
