import { prefix } from "../../config/command-config";
import { Command } from "../../models/command.model";
import { createRoom } from "../../services//create-room";

export const WatchTogether: Command = {
  name: `${prefix}w2g`,
  description: "Create a temporary watch together room",
  async execute(msg, args) {
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
  },
};
