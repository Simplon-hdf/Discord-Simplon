import { Events } from 'discord.js';
import logger from '../utils/logger';
import { DiscordClient } from '../client';
import { RedisManager } from '../utils/redis-manager';
import { RedisRoutes } from '../utils/routes/redis-routes';
import DiscordEvent from './discord-event';

export default class CategoryCreateEvent extends DiscordEvent {
  protected data: any;
  protected type: Events = Events.ChannelCreate;
  protected method = 'on';

  async execute(channel: any) {
    console.log(channel);
    // const id = this.data.toString().replace(/[^0-9]/g, '');
    // const client = DiscordClient.getInstance().getClient();
    // const categoryCached = await RedisManager.getInstance().get(
    //   RedisRoutes.LAST_CREATED_CATEGORY,
    // );
    //
    // logger.debug(categoryCached);
  }
}
