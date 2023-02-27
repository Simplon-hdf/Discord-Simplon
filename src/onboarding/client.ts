import {Guild} from "./guilds/guild";
import {GuildsManager} from "./guilds/guilds-manager";

export class DiscordClient {

  private static instance : DiscordClient;

  private readonly guildManager : GuildsManager;

  constructor() {
    this.guildManager = new GuildsManager();
  }


  static getInstance() : DiscordClient {
    if(!DiscordClient.instance){
      DiscordClient.instance = new DiscordClient();
    }
    return DiscordClient.instance;
  }

  getGuildManager(): GuildsManager {
    return DiscordClient.getInstance().guildManager;
  }

}