import { Events } from 'discord.js';

export default abstract class DiscordEvent {
  protected abstract data?: any;
  protected abstract type: Events;
  protected abstract method: string;

  abstract execute(data?: any): any;

  public get_type(): Events {
    return this.type;
  }
  public get_method(): string {
    return this.method;
  }
}
