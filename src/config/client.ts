require("dotenv").config();

import { Client, Collection } from "discord.js";
import { Command } from "./command-config";

export default class extends Client {
  commands: Collection<unknown, Command>;
  queue: Map<any, any>;

  constructor() {
    super();

    this.commands = new Collection();

    this.queue = new Map();

    this.login(process.env.TOKEN);
  }
}
