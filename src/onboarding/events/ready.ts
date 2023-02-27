import {Client, Events} from "discord.js";
import {DiscordClient} from "../client";
import {GuildsManager} from "../guilds/guilds-manager";


export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.info('Ready! Logged in as ' + client.user?.tag);

    const discordClient: DiscordClient = DiscordClient.getInstance();

    const guildManager: GuildsManager = discordClient.getGuildManager();

    client.guilds.cache.forEach((guild) => {
      guildManager.loadGuild(parseInt(guild.id))
        .catch(err => {
          console.error(err);
          process.exit(0);
        });

      discordClient.destroy();
    })

  }
}