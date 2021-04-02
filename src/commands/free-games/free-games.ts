import { prefix } from "../../config/command-config";
import { Command, FreeGamesModel } from "../../models";
import { validFreeGames } from "../../services/free-games";
import EmbeddedMessage from "../../shared/embedded-message";
import { properDateFormat } from "../../shared/utils/proper-date-format";

const FreeGames: Command = {
  name: `${prefix}fg`,
  description: "Displays list of current free games on Epic",
  async execute(msg) {
    const todayFormatted: string = properDateFormat(new Date());

    const FreeGamesMessage = new EmbeddedMessage()
      .setTitle(`${todayFormatted}`)
      .setAuthor(
        "Epic Free Games",
        "https://img.icons8.com/nolan/2x/epic-games.png",
        "https://www.epicgames.com/store/en-US/free-games"
      )
      .setColor("#0078F2");

    await validFreeGames()
      .then((g: any) =>
        g
          ? FreeGamesMessage.setDescription(
              g.map((x: FreeGamesModel) => x.title)
            )
          : FreeGamesMessage.setDescription("No games 😢")
      )
      .catch((err) => console.log(err));

    await msg.channel.send(FreeGamesMessage);
  },
};

export = FreeGames
