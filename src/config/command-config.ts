import { Message } from "discord.js";

export const prefix: string = ".";

// command type
export interface Command {
  name: string;
  description: string;
  execute: (message: Message, args?: string[]) => any;
  play?: any
}
