import fetch from "node-fetch";

import { ENDPOINTS } from "../config/endpoints";

import { FreeGamesModel } from "../models";

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
        const { promotionalOffers, upcomingPromotionalOffers } = promos
        
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
