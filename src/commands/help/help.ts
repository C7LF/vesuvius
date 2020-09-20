import { prefix } from "../../config/command-config";
import { Command } from "../../models/command.model";
import EmbeddedMessage from "../../shared/embedded-message";
import { BotCommands } from "../../commands/index";

export const HelpCommand: Command = {
  name: `${prefix}help`,
  description: "Displays list of available commands",
  execute: (msg): Promise<any> => {
    const helpMessage = new EmbeddedMessage()
      .setTitle("Available Commands")
      .setColor("#ea0000");

    Object.values(BotCommands).forEach((cmd) =>
      helpMessage.addField(cmd.name, cmd.description)
    );

    return msg.channel.send(helpMessage);
  },
};
