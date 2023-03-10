import { Client, Events } from "discord.js";
import { SlashCommand } from "../commands/SlashCommand";
import DiscordEvent from "../events/DiscordEvent";

export class UtilsManager {

  private static _client: Client;
  private static _commands: Map<String, SlashCommand> = new Map<String, SlashCommand>();
  private static _events: Map<Events, any> = new Map<Events, any>();

  public static init(client: Client) {
    this._client = client;
  }

  // Getters

  public static get_client(): Client {
    return this._client;
  }
  public static get_events(): Map<String, Events> {
    return this._events;
  }

  // Commands

  public static get_commands() : Map<String, SlashCommand> {
    return this._commands;
  }
  
  public static get_command(command_name: string): SlashCommand | undefined {
    return this._commands.get(command_name);
  }

  // Setters

  // Events

  public static add_event(event: DiscordEvent) {
    this._events.set(event.get_type(), event);
  }

  public static remove_event(event_type: Events) {
    this._events.delete(event_type);
  }

  // Commands

  public static add_command(command: SlashCommand) {
    this._commands.set(command.get_data().name, command);
  }

  public static remove_command(command_name: string) {
    this._commands.delete(command_name);
  }
}