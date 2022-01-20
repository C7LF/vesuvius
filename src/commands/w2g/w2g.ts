import { Message } from "discord.js";
import VesuviusCommand from "../../models/vesuvius-command.class";
import { createRoom } from "../../services/create-room";

const watchTogetherExecute = () => async (msg: Message, args?: string[]) => {
  // Base Url
  let mes = "https://w2g.tv/rooms/";

  // Remove embedded message
  msg.suppressEmbeds(true);

  if (args) {
    await createRoom(args[0])
      .then((response) => (mes += response.streamkey))
      .catch((err) => console.log("Error creating room: ", err));
    msg.channel.send(mes);
  } else {
    msg.channel.send("Error executing command");
  }
};

export = new VesuviusCommand(
  "w2g",
  "Create a temporary watch together room",
  watchTogetherExecute()
);
