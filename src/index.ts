require("dotenv").config();

import path from "path";
import Bot from "./config/client";
import { CronJob } from "cron";
import { TextChannel } from "discord.js";

import { Command, FreeGamesModel } from "./models";
import { validFreeGames } from "./services/free-games";
import EmbeddedMessage from "./shared/embedded-message";
import { getFiles } from "./shared/utils/get-files-in-directory";

export const bot: Bot = new Bot();

const userCommand: Set<string> = new Set();

const directoryPath = path.join(__dirname, "/commands");
const commandsList = getFiles(directoryPath);

// Populate command collection
commandsList.map((file) => {
  const command = require(file) as Command;
  console.log('file', file)
  bot.commands.set(command.name, command);
});

bot.on("ready", () => {
  try {
    // Every Monday & Thursday at 18:00 UTC
    const freeGamesJob = new CronJob(
      "0 18 * * 1,4",
      async () => {
        const todayFormatted: string = new Date().toLocaleDateString();

        const FreeGamesMessage = new EmbeddedMessage()
          .setTitle(`${todayFormatted}`)
          .setAuthor(
            "Epic Free Games",
            "https://img.icons8.com/nolan/2x/epic-games.png",
            "https://www.epicgames.com/store/en-US/free-games"
          )
          .setColor("#0078F2");

        await validFreeGames().then((g: any) =>
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
    console.log(bot.commands)
  } catch {
    console.info("Error starting..");
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
