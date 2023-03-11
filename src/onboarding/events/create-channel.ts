import { Events, Interaction } from 'discord.js';
import logger from '../utils/logger';
import { DiscordClient } from '../client';
import DiscordEvent from './DiscordEvent';

export default class ChannelCreateEvent extends DiscordEvent {
  protected data: any;
  protected type: Events = Events.ChannelCreate;
  protected method: string = 'on';

  async execute() {
    logger.debug(typeof this.data['channelID'].toString());

    // logger.debug(channelID)
    // const id = channelID.replace(/[^0-9]/g, '');
    // if (DiscordClient.getInstance('channel-create:' + id).isInstanciated()) {
    //   return;
    // }
  }
};
