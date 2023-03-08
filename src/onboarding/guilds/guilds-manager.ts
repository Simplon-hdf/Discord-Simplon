import {Guild, IGuild} from "./guild";
import {HttpUtils} from "../utils/http";
import {Routes} from "../utils/Routes";
import {ApiError} from "../utils/exceptions/api-error";
import logger from "../utils/logger";

export class GuildsManager {

  private guilds?: Guild;

  async loadGuild(guild_uuid: string): Promise<any> {

      const guildJSON = await new HttpUtils().get(Routes.GET_GUILD, guild_uuid);
      if(guildJSON.statusCode === 409){
        return undefined;
      }
      logger.info("GuildManager => Load guild : " + guild_uuid + '\n');

      const {id, name, member_size} = guildJSON;

      if(name === '' && id === '') {
        throw new ApiError('Fields is empty on load guild');
      }

    return guildJSON;
  }

  async registerGuild(guild: IGuild): Promise<any>{
    const guildJSON = await new HttpUtils().post(Routes.CREATE_GUILD, guild + '\n');

    logger.info("GuildManager => Register new guild");

    if(guildJSON.statusCode === 409) {
      throw new ApiError('API response is empty on register guild');
    }

    return guildJSON;
  }
}