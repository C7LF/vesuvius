import { prefix, Command } from "../../config/command-config";
import { validFreeGames } from "../../services/freeGames";
import { FreeGamesModel } from "../../models/free-games.model";
import { FreeGamesMessage } from "../../shared/free-games.embedded";

export const FreeGames: Command = {
  name: `${prefix}fg`,
  description: "Displays list of current free games on Epic",
  async execute(msg) {
    await validFreeGames.then((g: any) =>
        FreeGamesMessage.setDescription(g.map((x: FreeGamesModel) => x.title))
    );

    await msg.channel.send(FreeGamesMessage);
  },
};
