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

    logger.info('GuildManager => Load guild : ' + uuid + '\n');

    return guildJSON;
  }

  async getGuidChannels(uuid: string): Promise<any> {
    const guildJSON = await new HttpUtils().get(
      HttpRoutes.GET_GUILD_CHANNEL,
      uuid,
    );
    logger.info('GuildManager => Load guild : ' + uuid + '\n');

    return guildJSON;
  }

  async loadGuild(guild_uuid: string): Promise<any> {
    const guildJSON = await new HttpUtils().get(
      HttpRoutes.GET_GUILD,
      guild_uuid,
    );
    logger.info('GuildManager => Load guild : ' + guild_uuid + '\n');

    return guildJSON;
  }

  async registerGuild(guild: IGuild): Promise<any> {
    const guildJSON = await new HttpUtils().post(
      HttpRoutes.CREATE_GUILD,
      JSON.parse(JSON.stringify(guild)),
    );

    logger.info('GuildManager => Register new guild');

    return guildJSON;
  }

  async deleteGuild(guild_uuid: string): Promise<any> {
    const guildJSON = await new HttpUtils().delete(
      HttpRoutes.DELETE_GUILD,
      undefined,
      guild_uuid,
    );

    logger.info('GuildManager => Delete guild');

    return guildJSON;
  }

  getGuilds(): Promise<any> {
    const guilds = new HttpUtils().get(HttpRoutes.GET_GUILDS);
    return guilds;
  }
}
