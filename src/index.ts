require("dotenv").config();

import Bot from "./config/client";

import EmbeddedMessage from "./shared/embedded-message";

import { BotCommands } from "./commands/index";

//const CronJob = require('cron').CronJob

//const FreeGames = require('./services/freeGames');

export const bot = new Bot();

// Create command collection
// Populate command collection
Object.keys(BotCommands).map((key) => {
  bot.commands.set(BotCommands[key].name, BotCommands[key]);
});

bot.on("ready", async () => {
  console.log(`Logged in as ${bot.user?.tag}`);
});

bot.on("message", (msg) => {
  const args = msg.content.split(/ +/);
  const command = args.shift();

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command)?.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("Error executing command!");
  }
});
