require("dotenv").config();

import { Client, Collection } from "discord.js";
import { Command } from "../models/command.model";

export default class extends Client {
  public commands: Collection<unknown, Command>;
  public queue: any;

  constructor() {
    super();

    this.commands = new Collection();

    this.queue = new Map();

    this.login(process.env.TOKEN);
  }
}
