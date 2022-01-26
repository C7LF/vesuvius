import { prefix } from "../config/command-config";
import { Command } from "./command.model";

type Execute = Command["execute"];

export default class VesuviusCommand {
  constructor(
    private commandName: string,
    private commandDescription: string,
    private commandExecute: Execute
  ) {}

  get name(): string {
    return `${prefix}${this.commandName}`;
  }

  get description(): string {
    return this.commandDescription;
  }

  get execute() {
    return this.commandExecute;
  }
}
