import DiscordEvent from './discord-event';
import logger from '../utils/logger';
import { DiscordClient } from '../client';
import { Events } from 'discord.js';

export default class LeaveGuild extends DiscordEvent {
  protected data: any;
  protected type: Events = Events.GuildDelete;
  protected method = 'on';

  async execute() {
    const guild = this.data;
    logger.info('[Leave guild] ' + guild.name + ' [' + guild.id + ']');
    await DiscordClient.getInstance().getGuildManager().deleteGuild(guild.id);
  }
}
