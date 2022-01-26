require("dotenv").config();

import { CronJob } from "cron";
import { TextChannel } from "discord.js";
import fetch from "node-fetch";
import { bot } from "..";

import { ENDPOINTS } from "../config/endpoints";

import { FreeGamesModel } from "../models";
import EmbeddedMessage from "../shared/embedded-message";

import { properDateFormat } from "../shared/utils/proper-date-format";

// Get data
// TODO: Abstact out?
const getData = async <T>(): Promise<T> => {
  const response = await fetch(ENDPOINTS.EPIC_FREE_GAMES);
  return await response.json();
};

// get elements from free game data.
const freeGameData = async (): Promise<any> => {
  return await getData()
    .then((x: any) => x.data.Catalog.searchStore.elements)
    .catch((err) => console.log("Error fetching data from EPIC.", err));
};

// If effective date has passsed, the game is free, else display date.
export const validFreeGames = async (): Promise<FreeGamesModel[]> => {
  const freeGamesList: Array<FreeGamesModel> = [];

  await freeGameData().then((catalog) =>
    catalog.forEach((game: FreeGamesModel) => {
      const promos = game.promotions;

      if (promos) {
        const { promotionalOffers, upcomingPromotionalOffers } = promos;

        if (
          promotionalOffers.length > 0 &&
          promotionalOffers[0].promotionalOffers.some(
            (x) => x.discountSetting.discountPercentage === 0
          )
        ) {
          let gameFreeNow = { ...game, title: `${game.title} ➢ **FREE NOW**` };
          freeGamesList.push(gameFreeNow);
        } else if (
          upcomingPromotionalOffers.length &&
          upcomingPromotionalOffers[0].promotionalOffers.length
        ) {
          let gameFreeFuture = {
            ...game,
            title: `${game.title} ➢ *${properDateFormat(
              new Date(
                upcomingPromotionalOffers[0].promotionalOffers[0].startDate
              )
            )}*`,
          };
          freeGamesList.push(gameFreeFuture);
        }
      }
    })
  );

  return freeGamesList;
};

// Cron job for free games, every Monday & Thursday at 18:00 UTC
export const freeGamesJob = new CronJob(
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
      (bot.channels.cache.get(process.env.TEMP_CHANNEL_ID) as TextChannel).send(
        FreeGamesMessage
      );
    } else {
      console.info("Add channel env variable...");
    }
  },
  null,
  true,
  "UTC"
);
