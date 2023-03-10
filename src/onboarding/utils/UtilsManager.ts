import { Client, Collection } from "discord.js";
import { SlashCommand } from "../commands/SlashCommand";

export class UtilsManager {

  private static _client: Client;
  private static _commands: Map<String, SlashCommand> = new Map<String, SlashCommand>();
  private static _events: Map<String, any> = new Map<String, any>();

  public static init(client: Client) {
    this._client = client;
  }

  // Getters

  public static get_client(): Client {
    return this._client;
  }
  public static get_events(): Map<String, any> {
    return new Map<String, any>();
  }

  public static get_commands() : Map<String, any> {
    return this._commands;
  }
  
  public static get_command(command_name: string): SlashCommand | undefined {
    return this._commands.get(command_name);
  }

  // Setters

  public static add_command(command: SlashCommand) {
    this._commands.set(command.get_data().name, command);
  }
}