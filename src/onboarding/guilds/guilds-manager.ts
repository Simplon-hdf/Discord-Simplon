import { IGuild } from './guild';
import { HttpUtils } from '../utils/http';
import { HttpRoutes } from '../utils/routes/http-routes';
import { ApiError } from '../utils/exceptions/api-error';
import logger from '../utils/logger';
import { log } from 'util';

export class GuildsManager {
  async getGuildCategories(uuid: string): Promise<any> {
    const guildJSON = await new HttpUtils().get(
      HttpRoutes.GET_GUILD_CATEGORY,
      uuid,
    );
    if (guildJSON.statusCode === 409) {
      return undefined;
    }
    logger.info('GuildManager => Load guild : ' + uuid + '\n');

    return guildJSON;
  }

  async getGuidChannels(uuid: string): Promise<any> {
    const guildJSON = await new HttpUtils().get(
      HttpRoutes.GET_GUILD_CHANNEL,
      uuid,
    );
    if (guildJSON.statusCode === 409) {
      return undefined;
    }
    logger.info('GuildManager => Load guild : ' + uuid + '\n');

    return guildJSON;
  }

  async loadGuild(guild_uuid: string): Promise<any> {
    const guildJSON = await new HttpUtils().get(
      HttpRoutes.GET_GUILD,
      guild_uuid,
    );
    if (guildJSON.statusCode === 409) {
      return undefined;
    }
    logger.info('GuildManager => Load guild : ' + guild_uuid + '\n');

    return guildJSON;
  }

  async registerGuild(guild: IGuild): Promise<any> {
    const guildJSON = await new HttpUtils().post(
      HttpRoutes.CREATE_GUILD,
      JSON.parse(JSON.stringify(guild)),
    );

    logger.info('GuildManager => Register new guild');

    if (guildJSON.statusCode === 409) {
      throw new ApiError('API response is empty on register guild');
    }

    return guildJSON;
  }
}
