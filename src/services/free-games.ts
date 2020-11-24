import fetch from "node-fetch";

import { ENDPOINTS } from "../config/endpoints";

import { FreeGamesModel } from "../models/free-games.model";

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

// If effective date has passsed, the game is free, else coming soon.
// Note for this: games on sale twice will have a effectiveDate value from the first time they were on sale
// TODO: logic needed to detect the dates far in the past and change the data from effectiveData to startDate.
export const validFreeGames = async (): Promise<FreeGamesModel> => {
  return await freeGameData().then((catalog) =>
    catalog.map((game: FreeGamesModel) => {

      const promos = game.promotions;

      if (promos.promotionalOffers.length > 0) {
        game.title += " ➢ **FREE NOW**";
      } else if (
        promos.upcomingPromotionalOffers[0].promotionalOffers.length > 0
      ) {
        game.title += ` ➢ *${properDateFormat(
          new Date(
            promos.upcomingPromotionalOffers[0].promotionalOffers[0].startDate
          )
        )}*`;
      }

      return game;
    })
  );
};
