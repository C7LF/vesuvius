import { prefix, Command } from "../../config/command-config";
import { validFreeGames } from "../../services/freeGames";
import EmbeddedMessage from "../../shared/embedded-message";
import { FreeGamesModel } from "../../models/free-games.model";

const TodayFormatted: string = new Date().toLocaleDateString()

export const FreeGames: Command = {
  name: `${prefix}fg`,
  description: "Displays list of current free games on Epic",
  async execute(msg) {
    const FreeGamesMessage = new EmbeddedMessage()
      .setTitle(`${TodayFormatted}`)
      .setAuthor(
        "Epic Free Games",
        "https://img.icons8.com/nolan/2x/epic-games.png",
        "https://www.epicgames.com/store/en-US/free-games"
      )
      .setColor("#0078F2");

    await validFreeGames.then((g: any) =>
        FreeGamesMessage.setDescription(g.map((x: FreeGamesModel) => x.title))
    );

    await msg.channel.send(FreeGamesMessage);
  },
};
