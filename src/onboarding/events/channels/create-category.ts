import { ChannelType, Events, GuildBasedChannel } from 'discord.js';
import logger from '../../utils/logger';
import { DiscordClient } from '../../client';
import { RedisManager } from '../../utils/redis-manager';
import { RedisRoutes } from '../../utils/routes/redis-routes';
import DiscordEvent from '../discord-event';
import { channel } from 'diagnostics_channel';
import { Category } from '../../channels/category/category';

export default class CategoryCreateEvent extends DiscordEvent {
  protected data: any;
  protected type: Events = Events.ChannelCreate;
  protected method = 'on';

  async execute(channels: GuildBasedChannel[]) {
    const channel = channels[0];
    const id = channel.id;

    console.log(channel.type);

    if (channel.type !== ChannelType.GuildCategory) {
      logger.debug('Channel is not a category');
      return;
    }

    const categoryCached = await RedisManager.getInstance().get(
      RedisRoutes.LAST_CREATED_CATEGORY,
    );

    if (categoryCached && categoryCached === id) {
      await RedisManager.getInstance().del(RedisRoutes.LAST_CREATED_CATEGORY);
      logger.debug('Category already created');
      return;
    }

    await DiscordClient.getInstance()
      .getCategoryManager()
      .registerCategory(
        new Category(channel.guild.id, channel.id, channel.name),
      );
  }
}
