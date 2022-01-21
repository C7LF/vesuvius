import EmbeddedMessage from "../../shared/embedded-message";
import { bot } from "../../index";
import VesuviusCommand from "../../models/vesuvius-command.class";
import { Message } from "discord.js";

const helpExecute = () => (msg: Message) => {
  const helpMessage = new EmbeddedMessage()
    .setTitle("Available Commands")
    .setColor("#ea0000");

  bot.commands.forEach((cmd) =>
    helpMessage.addField(cmd.name, cmd.description)
  );
  console.log('test', helpMessage)
  return msg.channel.send(helpMessage);
};

export = new VesuviusCommand(
  "help",
  "Displays a list of available commands",
  helpExecute()
);
