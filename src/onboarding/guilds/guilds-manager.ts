import {Guild} from "./guild";
import {HttpUtils} from "../utils/http";
import {Routes} from "../utils/Routes";
import {Config} from "../config/config";

export class GuildsManager {

  private guilds?: Guild;

  constructor() {
  }

  async loadGuild(guild_uuid: number) {
      const guildJSON = await new HttpUtils().get(Routes.GET_GUILD, guild_uuid.toString());

      if(guildJSON){
        throw new ApiError('Bot try register existing guild');
      }

      const {id, name} = guildJSON;

      if(name === '' && id === ''){
        throw new ApiError('API response is empty for register guild');
      }

      const configJSON = await new HttpUtils().get(Routes.GET_GUILD_CONFIG);
      const configKeys = Object.keys(configJSON);

      if(configKeys.length === 0){
        throw new ApiError('API response is empty for instancie config');
      }

      for(let confKey of configKeys){
        if (confKey === ''){
          throw new ApiError('API response is empty for instancie config');
        }
      }

      try {
        const config: IConfig = configJSON as IConfig;
        this.guilds = new Guild(id, name, config);
      }catch (e) {
        throw new ApiError('API response not corresponding with Config class');
      }


  }
}