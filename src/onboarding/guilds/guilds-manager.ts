import {Guild} from "./guild";
import {HttpUtils} from "../utils/http";
import {Routes} from "../utils/Routes";

export class GuildsManager {

  private readonly _guild_uuid : number;
  private guilds : Guild;

  constructor(guild_uuid: number) {
    this._guild_uuid = guild_uuid;
  }

  async registerGuild() {
      const guildJSON = await new HttpUtils().get(Routes.GET_GUILD_CONFIG);

      if(guildJSON){
        throw new ApiError('Bot try register existing guild');
      }

      const {id, name} = guildJSON;

      if(name === '' && id === ''){
        throw new ApiError('API response is empty for register guild');
      }

      const config = await new HttpUtils().get(Routes.GET_GUILD_CONFIG)

  }

  getGuild() {

  }
}