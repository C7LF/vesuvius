import fetch from "node-fetch";

import { ENDPOINTS } from "../config/endpoints";

import { FreeGamesModel } from "../models/free-games.model";

// Get data
// TODO: Abstact out?
const getData = async (): Promise<any> => {
  const response = await fetch(ENDPOINTS.EPIC_FREE_GAMES);
  const body = await response.json();
  return body;
};

// get elements from free game data.
const freeGameData: Promise<any> = getData().then((x) => x.data.Catalog.searchStore.elements);

// If effective date has passsed, the game is free, else coming soon.
// Note for this: games on sale twice will have a effectiveDate value from the first time they were on sale
// TODO: logic needed to detect the dates far in the past and change the data from effectiveData to startDate.
export const validFreeGames: Promise<FreeGamesModel> = freeGameData.then(
  (catalog) =>
    catalog.filter(
      (game: FreeGamesModel) =>
        Date.parse(game.effectiveDate) - Date.parse(Date()) < 0
    )
);
