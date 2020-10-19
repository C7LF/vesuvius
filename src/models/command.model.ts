import { Message } from "discord.js";

// command type 
export interface Command {
    name: string;
    description: string;
    execute: (message: Message, args?: string[]) => any;
  }