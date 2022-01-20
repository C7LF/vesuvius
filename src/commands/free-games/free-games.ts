import { Message } from "discord.js";
import { FreeGamesModel } from "../../models";
import VesuviusCommand from "../../models/vesuvius-command.class";
import { validFreeGames } from "../../services/free-games";
import EmbeddedMessage from "../../shared/embedded-message";
import { properDateFormat } from "../../shared/utils/proper-date-format";

const freeGamesExecute = () => async (msg: Message) => {
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
        ? FreeGamesMessage.setDescription(g.map((x: FreeGamesModel) => x.title))
        : FreeGamesMessage.setDescription("No games 😢")
    )
    .catch((err) => console.log(err));

  await msg.channel.send(FreeGamesMessage);
};

export = new VesuviusCommand(
  "fg",
  "Displays a list of current free games on Epic",
  freeGamesExecute()
);
