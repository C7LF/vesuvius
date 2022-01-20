import { Message } from "discord.js";
import VesuviusCommand from "../../models/vesuvius-command.class";
import EmbeddedMessage from "../../shared/embedded-message";

const reminderExecute =
  () =>
  (msg: Message): Promise<Message> => {
    const helpMessage = new EmbeddedMessage()
      .setTitle("Test")
      .setColor("#ea0000");

    return msg.channel.send(helpMessage);
  };

export = new VesuviusCommand("reminder", "WIP", reminderExecute());
