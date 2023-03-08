import {ChannelType, Client, Events, Guild as DiscordGuild} from "discord.js";
import {DiscordClient} from "../client";
import {GuildsManager} from "../guilds/guilds-manager";
import {Guild, IGuild} from "../guilds/guild";
import logger from "../utils/logger";
import {HttpUtils} from "../utils/http";
import {Routes} from "../utils/Routes";


export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    logger.info('Ready! Logged in as ' + client.user?.tag);
    client.guilds.cache.forEach(async (element) => {
      const discordClient: DiscordClient = DiscordClient.getInstance(element.id);
      const guildManager: GuildsManager = discordClient.getGuildManager();
      let guild_id: any;

      const guild = await guildManager.loadGuild(element.id);
      guild_id = guild.data.id;

      if(guild === undefined){
        // Enregistrement des guilds dans la base de données
        const newGuild: IGuild = new Guild(
          element.id,
          element.name,
          element.memberCount
        )

        const guild = await guildManager.registerGuild(newGuild);

        // Récupération de l'id en base de données de la guild
        guild_id = guild.data.id;
      }
      registerChannels(element, guild_id);


      discordClient.destroy();
    })
  }
}

function registerChannels(guild: DiscordGuild, guild_id: string) {
  // Enregistrement des categories dans la base de données
  const categories = guild.channels.cache.filter((channel) => channel.type === ChannelType.GuildCategory);

  categories.forEach(async (category) => {
    logger.info("[Registering category] " + category.name + " : Guild => " + guild.id);
    await new HttpUtils().post(Routes.REGISTER_GUILD_CATEGORY, {
      category_uuid: category.id,
      category_name: category.name,
      guilds_id: guild_id
    });
  });
  // Enregistrement des channels dans la base de données
  const channels = guild.channels.cache.filter((channel) => channel.type !== ChannelType.GuildCategory);
  channels.forEach(async (channel) => {
    logger.info("[Registering channel] " + channel.name + " : Guild => " + guild.id);

    const parentId = channel.parentId;

    if(parentId === null){
      await new HttpUtils().post(Routes.REGISTER_GUILD_CHANNEL, {
        "channel_name" : channel.name,
        "channel_uuid" : channel.id,
        "id_guilds": guild_id
      });
    }

    await new HttpUtils().post(Routes.REGISTER_GUILD_CHANNEL, {
      "channel_name" : channel.name,
      "channel_uuid" : channel.id,
      "id_guilds": guild_id,
      "category_uuid": parentId
    });

  });
}