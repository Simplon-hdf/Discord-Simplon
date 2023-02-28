import {Client, Events} from "discord.js";


export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.info('Ready! Logged in as ' + client.user?.tag);

    const discordClient: DiscordClient = DiscordClient.getInstance();

    const guildManager: GuildsManager = discordClient.getGuildManager();

    client.guilds.cache.forEach(async (element) => {
      const guild = await guildManager.loadGuild(parseInt(element.id));

      if(guild === undefined){
        guildManager.registerGuild(new Guild(

        ))
      }

      discordClient.destroy();
    })

  }
}