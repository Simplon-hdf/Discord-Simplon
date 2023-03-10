import { IChannel } from './channel';
import { HttpUtils } from '../../utils/http';
import { Routes } from '../../utils/Routes';
import { ApiError } from '../../utils/exceptions/api-error';
import logger from '../../utils/logger';

export class ChannelManager {
  async registerChannel(channel: IChannel) {
    const channelJSON = await new HttpUtils().post(
      Routes.REGISTER_GUILD_CHANNEL,
      JSON.parse(JSON.stringify(channel)),
    );

    // logger.debug(JSON.stringify(channel));

    if (channelJSON.statusCode === 409) {
      return channelJSON;
    }

    logger.debug(
      '[Registering channel] ' +
        ' : Guild => name : ' +
        channel.getName() +
        ' | id: ' +
        channel.getUuid() +
        ' | categories: ' +
        channel.getUuid(),
    );

    return channelJSON;
  }

  async updateChannelName(channel: IChannel) {
    const channelJSON = await new HttpUtils().patch(
      Routes.UPDATE_CHANNEL_NAME,
      JSON.parse(JSON.stringify(channel)),
    );

    if (channelJSON.statusCode === 409) {
      return;
    }

    logger.debug(
      '[Updating channel name] ' +
        ' : Guild => name : ' +
        channel.getName() +
        ' | id: ' +
        channel.getUuid() +
        ' | categories: ' +
        channel.getUuid(),
    );

    return channelJSON;
  }

  async deleteChannel(channelUUID: string) {
    const channelJSON = await new HttpUtils().delete(
      Routes.DELETE_CHANNEL,
      null,
      channelUUID,
    );

    if (channelJSON.statusCode === 409) {
      return;
    }

    return channelJSON;
  }
}
