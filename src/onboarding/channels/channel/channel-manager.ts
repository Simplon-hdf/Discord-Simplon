import { IChannel } from './channel';
import { HttpUtils } from '../../utils/http';
import { HttpRoutes } from '../../utils/routes/http-routes';
import { ApiError } from '../../utils/exceptions/api-error';
import logger from '../../utils/logger';

export class ChannelManager {
  async registerChannel(channel: IChannel) {
    const channelJSON = await new HttpUtils().post(
      HttpRoutes.REGISTER_GUILD_CHANNEL,
      JSON.parse(JSON.stringify(channel)),
    );

    // logger.debug(JSON.stringify(channel));

    if (channelJSON.statusCode === 404) {
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
      HttpRoutes.UPDATE_CHANNEL_NAME,
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
      HttpRoutes.DELETE_CHANNEL,
      null,
      channelUUID,
    );

    if (channelJSON.statusCode === 409) {
      return;
    }

    return channelJSON;
  }
}
