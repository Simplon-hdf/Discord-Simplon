import {Client, Events} from "discord.js";
import {DiscordClient} from "../client";
import {GuildsManager} from "../guilds/guilds-manager";
import {Guild} from "../guilds/guild";
import {Config} from "../config/config";


export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.info('Ready! Logged in as ' + client.user?.tag);



    client.guilds.cache.forEach(async (element) => {
      const discordClient: DiscordClient = DiscordClient.getInstance();
      const guildManager: GuildsManager = discordClient.getGuildManager();

      const guild = await guildManager.loadGuild(parseInt(element.id));

      if(guild === undefined){
        await guildManager.registerGuild(new Guild(
          parseInt(element.id),
          element.name,
          new Config(
            0,
            0,
            0,
            0
          )
        ))
      }

      discordClient.destroy();
    })

  }
}