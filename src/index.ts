require("dotenv").config();

import Bot from "./config/client";
import { CronJob } from "cron";
import { TextChannel } from "discord.js";

import { BotCommands } from "./commands/index";
import { FreeGamesModel } from "./models/free-games.model";
import { validFreeGames } from "./services/freeGames";
import { FreeGamesMessage } from "./shared/free-games.embedded";

export const bot = new Bot();

// Create command collection
// Populate command collection
Object.keys(BotCommands).map((key) => {
  bot.commands.set(BotCommands[key].name, BotCommands[key]);
});

bot.on("ready", () => {
  try {
    // Every Monday & Thursday at 18:00 UTC
    const freeGamesJob = new CronJob(
      "0 18 * * 1,4",
      async () => {
        await validFreeGames.then((g: any) =>
          FreeGamesMessage.setDescription(g.map((x: FreeGamesModel) => x.title))
        );

        if (process.env.TEMP_CHANNEL_ID) {
          (bot.channels.cache.get(
            process.env.TEMP_CHANNEL_ID
          ) as TextChannel).send(FreeGamesMessage);
        } else {
          console.info("Add channel env variable...");
        }
      },
      null,
      true,
      "UTC"
    );

    freeGamesJob.start();

    console.info(`Logged in as ${bot.user?.tag}!`);
  } catch {
    console.info("Error starting..");
  }
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
