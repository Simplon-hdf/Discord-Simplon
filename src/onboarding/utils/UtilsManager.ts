import { Client, Events } from "discord.js";
import { SlashCommand } from "../commands/SlashCommand";
import CustomComponent from "../components/CustomComponent";
import DiscordEvent from "../events/DiscordEvent";
import command_handler from "../handlers/command_handler";
import components_handler from "../handlers/components_handler";
import event_handler from "../handlers/event_handler";
import { ProcedureManager } from "./procedures/ProcedureManager";

export class UtilsManager {

  private static _client: Client;
  private static _commands: Map<String, SlashCommand> = new Map<String, SlashCommand>();
  private static _events: Map<Events, DiscordEvent> = new Map<Events, DiscordEvent>();
  private static _components: Map<String, CustomComponent> = new Map<String, CustomComponent>();
  private static _procedureManagers: Map<String, ProcedureManager> = new Map<String, ProcedureManager>();

  public static init(client: Client, discord_token: any, discord_id: any) {
    this._client = client;
    command_handler(discord_token, discord_id);
    event_handler();
    components_handler();
  }

  // Getters

  public static get_client(): Client {
    return this._client;
  }

  // Commands

  public static get_commands(): Map<String, SlashCommand> {
    return this._commands;
  }

  public static get_command(command_name: string): SlashCommand | undefined {
    return this._commands.get(command_name);
  }

  // Events

  public static get_events(): Map<Events, DiscordEvent> {
    return this._events;
  }

  public static get_event(event: Events): DiscordEvent | undefined {
    return this._events.get(event);
  }

  // Components

  public static get_components(): Map<String, CustomComponent> {
    return this._components;
  }

  public static get_component(component_id: string): CustomComponent | undefined {
    return this._components.get(component_id);
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

  // Components

  public static add_component(component: CustomComponent) {
    this._components.set(component.get_customId(), component);
  }

  public static remove_component(component_id: string) {
    this._components.delete(component_id);
  }
}