import { ChannelType, Events, Interaction } from 'discord.js';
import logger from '../utils/logger';
import { DiscordClient } from '../client';
import { Category } from '../channels/category/category';
import EventEmitter from 'events';

export default {
  name: Events.ChannelCreate,
  on: true,
  async execute(channelID: any) {
    const id = channelID.toString().replace(/[^0-9]/g, '');
    const client = DiscordClient.getInstance('channel-create').getClient();

    new EventEmitter().emit('channel-create', id, client);
  },
};
