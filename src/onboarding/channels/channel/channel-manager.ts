import { IChannel } from './channel';
import { HttpUtils } from '../../utils/http';
import { Routes } from '../../utils/Routes';
import { ApiError } from '../../utils/exceptions/api-error';
import logger from '../../utils/logger';

export class ChannelManager {
  async registerChannel(channel: IChannel) {
    const channelJSON = await new HttpUtils().post(
      Routes.REGISTER_GUILD_CATEGORY,
      JSON.parse(JSON.stringify(channel)),
    );

    if (channelJSON.statusCode === 409) {
      throw new ApiError('API response is empty on register channel');
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
}
