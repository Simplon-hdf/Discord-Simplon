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

      if(guild === undefined){
        // Enregistrement des guilds dans la base de données
        const newGuild: IGuild = new Guild(
          element.id,
          element.name,
          element.memberCount
        )

        const responseGuild = await guildManager.registerGuild(newGuild);


        // Récupération de l'id en base de données de la guild
        guild_id = responseGuild.data.id;
      }

      guild_id === undefined ? guild_id = guild.data.id : null;

      registerChannels(element, guild_id).then(async () => {

        logger.debug(guild)
        await registerChannelsStock(element, guild_id);
      });


      discordClient.destroy();
    })
  }
}

/**
 * Enregistre la category de stockage dans la base de données
 * @param guild Object guild de discord
 * @param guild_id Identifiant de la guilde en base de données
 */
async function registerChannelsStock(guild: DiscordGuild, guild_id: string) {


  const channelsStockExist = await new HttpUtils().get(Routes.GET_CHANNELS_STOCK_EXIST, guild.id);


  if(!channelsStockExist.data) {
    return
  }

  const channelsStock = await guild.channels.create({
    name: 'Channels Stock',
    type: ChannelType.GuildCategory,
    position: 100
  })

  logger.info('[Registering category] Register channels stock category')
  await new HttpUtils().post(Routes.REGISTER_GUILD_CATEGORY, {
    category_uuid: channelsStock.id,
    category_name: channelsStock.name,
    guilds_id: guild_id
  });

  await new HttpUtils().post(Routes.REGISTER_CHANNEL_STOCK, undefined, channelsStock.id);


}

/**
 * Enregistre les channels et les categories dans la base de données
 * @param guild Object guild de discord
 * @param guild_id Identifiant de la guild en base de données
 */
async function registerChannels(guild: DiscordGuild, guild_id: string) {
  // Enregistrement des categories dans la base de données
  new Promise(() => {
    const categories = guild.channels.cache.filter((channel) => channel.type === ChannelType.GuildCategory);

    categories.forEach(async (category) => {
      // logger.info("[Registering category] " + category.name + " : Guild => " + guild.id);
      new HttpUtils().post(Routes.REGISTER_GUILD_CATEGORY, {
        category_uuid: category.id,
        category_name: category.name,
        guilds_id: guild_id
      }).then(() => {
        // Enregistrement des channels dans la base de données
        const channels = guild.channels.cache.filter((channel) => channel.type !== ChannelType.GuildCategory && channel.parent?.type !== ChannelType.GuildText);
        channels.forEach(async (channel) => {

          const parentId = channel.parentId;
          // logger.info("[Registering channel] " + parentId + " : Guild => " + guild.id);

          if(parentId === null){
            await new HttpUtils().post(Routes.REGISTER_GUILD_CHANNEL, {
              "channel_name" : channel.name,
              "channel_uuid" : channel.id,
              "id_guilds": guild_id
            });
          }else {
            await new HttpUtils().post(Routes.REGISTER_GUILD_CHANNEL, {
              "channel_name" : channel.name,
              "channel_uuid" : channel.id,
              "id_guilds": guild_id,
              "category_uuid": parentId
            });
          }
        });
      });
    });
  })

}