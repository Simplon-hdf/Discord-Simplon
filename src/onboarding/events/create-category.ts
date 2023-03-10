import { ChannelType, Events, Interaction } from 'discord.js';
import logger from '../utils/logger';
import { DiscordClient } from '../client';
import { Category } from '../channels/category/category';
import EventEmitter from 'events';
import { RedisManager } from '../utils/redis-manager';
import { RedisRoutes } from '../utils/routes/redis-routes';

export default {
  name: Events.ChannelCreate,
  on: true,
  async execute(channelID: any) {
    const id = channelID.toString().replace(/[^0-9]/g, '');
    const client = DiscordClient.getInstance().getClient();
    const categoryCached = await RedisManager.getInstance().get(
      RedisRoutes.LAST_CREATED_CATEGORY,
    );

    logger.debug(categoryCached);
  },
};
