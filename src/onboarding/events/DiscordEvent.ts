import { Events } from "discord.js";
import { UtilsManager } from "../utils/UtilsManager";

export default abstract class DiscordEvent {

  protected abstract type: Events;
  protected abstract method: string;

  abstract execute(): void;

  public get_type() : Events {
    return this.type;
  }
  public get_method(): string {
    return this.method;
  }
}