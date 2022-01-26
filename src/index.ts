import path from "path";
import Bot from "./config/client";

import { Command } from "./models";
import { freeGamesJob } from "./services/free-games";
import { getFiles } from "./shared/utils/get-files-in-directory";

export const bot: Bot = new Bot();

const userCommand: Set<string> = new Set();

const directoryPath = path.join(__dirname, "/commands");
const commandsList = getFiles(directoryPath);

// Populate command collection
commandsList.map((file) => {
  const command = require(file) as Command;
  bot.commands.set(command.name, command);
});

bot.on("ready", () => {
  try {
    freeGamesJob.start();

    console.info(`Logged in as ${bot.user?.tag}!`);
  } catch {
    console.info("Error starting...");
  }
});

bot.on("message", (msg) => {
  const args = msg.content.split(/ +/);
  const command = args.shift();

  if (!bot.commands.has(command)) return;

  try {
    if (userCommand.has(msg.author.id)) {
      msg.reply(`Woah there calm down`);
    } else {
      userCommand.add(msg.author.id);
      bot.commands.get(command)?.execute(msg, args);
      setTimeout(() => {
        userCommand.delete(msg.author.id);
      }, 3000);
    }
  } catch (error) {
    console.error(error);
    msg.reply("Error executing command!");
  }
});
