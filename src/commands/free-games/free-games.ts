import { prefix } from "../../config/command-config";
import { Command } from "../../models/command.model";
import { validFreeGames } from "../../services/freeGames";
import { FreeGamesModel } from "../../models/free-games.model";
import { FreeGamesMessage } from "../../shared/free-games.embedded";

export const FreeGames: Command = {
  name: `${prefix}fg`,
  description: "Displays list of current free games on Epic",
  async execute(msg) {
    await validFreeGames
      .then((g: any) =>
        FreeGamesMessage.setDescription(g.map((x: FreeGamesModel) => x.title))
      )
      .catch((err) => console.log(err));

    await msg.channel.send(FreeGamesMessage);
  },
};
