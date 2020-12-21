import fetch from "node-fetch";

import { ENDPOINTS } from "../config/endpoints";

import { FreeGamesModel } from "../models";

import { properDateFormat } from "../shared/helpers/proper-date-format";

// Get data
// TODO: Abstact out?
const getData = async (): Promise<any> => {
  const response = await fetch(ENDPOINTS.EPIC_FREE_GAMES);
  const body = await response.json();
  return body;
};

// get elements from free game data.
const freeGameData = async (): Promise<any> => {
  return await getData()
    .then((x) => x.data.Catalog.searchStore.elements)
    .catch((err) => console.log("Error fetching data from EPIC.", err));
};

// If effective date has passsed, the game is free, else display date.
export const validFreeGames = async (): Promise<FreeGamesModel[]> => {
  const freeGamesList: Array<FreeGamesModel> = [];

  await freeGameData().then((catalog) =>
    catalog.forEach((game: FreeGamesModel) => {
      const promos = game.promotions;

      if (promos.promotionalOffers.length) {
        let gameFreeNow = { ...game, title: `${game.title} ➢ **FREE NOW**` };
        freeGamesList.push(gameFreeNow);
      } else if (
        promos.upcomingPromotionalOffers.length &&
        promos.upcomingPromotionalOffers[0].promotionalOffers.length
      ) {
        let gameFreeFuture = {
          ...game,
          title: `${game.title} ➢ *${properDateFormat(
            new Date(
              promos.upcomingPromotionalOffers[0].promotionalOffers[0].startDate
            )
          )}*`,
        };
        freeGamesList.push(gameFreeFuture);
      }
    })
  );

  return freeGamesList;
};
