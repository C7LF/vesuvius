import { prefix } from "../config/command-config";
import { Command } from "./command.model";

type Execute = Command["execute"];

export default class VesuviusCommand {
  private _commandName: string;
  private _commandDescription: string;
  private _commandExecute: Execute;

  constructor(
    commandName: string,
    commandDescription: string,
    commandExecute: Execute
  ) {
    this._commandName = commandName;
    this._commandDescription = commandDescription;
    this._commandExecute = commandExecute;
  }

  get name(): string {
    return `${prefix}${this._commandName}`;
  }

  get description(): string {
    return this._commandDescription;
  }

  get execute() {
    return this._commandExecute;
  }
}
