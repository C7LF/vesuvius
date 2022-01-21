import EmbeddedMessage from "../../shared/embedded-message";
import { bot } from "../../index";
import VesuviusCommand from "../../models/vesuvius-command.class";
import { Message } from "discord.js";

const helpExecute = () => (msg: Message) => {
  const helpMessage = new EmbeddedMessage()
    .setTitle("Available Commands")
    .setColor("#ea0000");

  bot.commands.forEach(
    ({ name, description }) =>
      name && description && helpMessage.addField(name, description)
  );

  return msg.channel.send(helpMessage);
};

export = new VesuviusCommand(
  "help",
  "Displays a list of available commands",
  helpExecute()
);
