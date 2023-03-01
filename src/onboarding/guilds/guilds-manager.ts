import {Guild} from "./guild";
import {HttpUtils} from "../utils/http";
import {Routes} from "../utils/Routes";
import {ApiError} from "../utils/exceptions/api-error";
import logger from "../utils/logger";

export class GuildsManager {

  private guilds?: Guild;

  async loadGuild(guild_uuid: number) /*: Promise<Guild | undefined> */{

      const guildJSON = await new HttpUtils().get(Routes.GET_GUILD, guild_uuid.toString())
        .catch((err) => {
            logger.error(err);
        });

      logger.debug(guildJSON)

      // if(guildJSON.statusCode === 409){
      //   throw new ApiError('Bot try register existing guild');
      // }
      //
      // const {id, name} = guildJSON;
      //
      // if(name === '' && id === '') {
      //   return undefined;
      // }
      //
      // try {
      //   this.guilds = new Guild(id, name);
      //   return this.guilds;
      // }catch (e) {
      //   throw new ApiError('API response not corresponding with Config class');
      // }
  }

  async registerGuild(guild: Guild){
    const guildJSON = await new HttpUtils().post(Routes.GET_GUILD_CONFIG, guild)
      .catch((err) => {
          logger.error(err);
      });

    if(guildJSON.statusCode === 409) {
      throw new ApiError('API response is empty on register guild');
    }

    if(guildJSON.statusCode === 'ok'){
      return;
    }
  }
}