import {
  ChannelType,
  Events,
  GuildBasedChannel,
  Interaction,
} from 'discord.js';
import logger from '../../utils/logger';
import { DiscordClient } from '../../client';
import DiscordEvent from '../discord-event';
import { RedisManager } from '../../utils/redis-manager';
import { RedisRoutes } from '../../utils/routes/redis-routes';
import { Category } from '../../channels/category/category';

export default class ChannelCreateEvent extends DiscordEvent {
  protected data: any;
  protected type: Events = Events.ChannelCreate;
  protected method = 'on';

  async execute(channels: GuildBasedChannel[]) {
    const channel = channels[0];
    const id = channel.id;

    console.log(channel.type);

    if (
      channel.type !== ChannelType.GuildCategory &&
      channel.parent?.type !== ChannelType.GuildText
    ) {
      logger.debug('Channel is not a category');
      return;
    }

    const categoryCached = await RedisManager.getInstance().get(
      RedisRoutes.LAST_CREATED_CHANNEL,
    );

    if (categoryCached && categoryCached === id) {
      await RedisManager.getInstance().del(RedisRoutes.LAST_CREATED_CHANNEL);
      logger.debug('Channel already created');
      return;
    }

    await DiscordClient.getInstance()
      .getCategoryManager()
      .registerCategory(
        new Category(channel.guild.id, channel.id, channel.name),
      );
  }
}
