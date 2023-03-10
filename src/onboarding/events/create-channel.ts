import { Events, Interaction } from 'discord.js';
import logger from '../utils/logger';
import { DiscordClient } from '../client';

export default {
  name: Events.ChannelCreate,
  on: true,
  async execute(channelID: any) {
    logger.debug(typeof channelID.toString());

    // logger.debug(channelID)
    // const id = channelID.replace(/[^0-9]/g, '');
    // if (DiscordClient.getInstance('channel-create:' + id).isInstanciated()) {
    //   return;
    // }
  },
};
