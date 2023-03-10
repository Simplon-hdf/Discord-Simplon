import { ChannelType, Client, Events, Guild as DiscordGuild } from 'discord.js';
import { DiscordClient } from '../client';
import { GuildsManager } from '../guilds/guilds-manager';
import { Guild, IGuild } from '../guilds/guild';
import logger from '../utils/logger';
import { HttpUtils } from '../utils/http';
import { Routes } from '../utils/Routes';
import { Category } from '../channels/category/category';
import { Channel } from '../channels/channel/channel';
import {User} from "../users/user";

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    logger.info('Ready! Logged in as ' + client.user?.tag);
    client.guilds.cache.forEach(async (element) => {
      const discordClient: DiscordClient = DiscordClient.getInstance(
        element.id,
      );
      const guildManager: GuildsManager = discordClient.getGuildManager();
      let guild_id: any;

      const guild = await guildManager.loadGuild(element.id);

      if (guild === undefined) {
        // Enregistrement des guilds dans la base de données
        const newGuild: IGuild = new Guild(
          element.id,
          element.name,
          element.memberCount,
        );

        const responseGuild = await guildManager.registerGuild(newGuild);

        // Récupération de l'id en base de données de la guild
        guild_id = responseGuild.data.id;
      }

      guild_id === undefined ? (guild_id = guild.data.id) : null;

      await registerChannelsStock(element, guild_id);
      await registerChannels(element, guild_id);
      await updateChannels(element, guild_id);
      await deleteChannels(element);

      discordClient.destroy();
    });
  },
};

/**
 * Enregistre la category de stockage dans la base de données
 * @param guild Object guild de discord
 * @param guild_id Identifiant de la guilde en base de données
 */
async function registerChannelsStock(guild: DiscordGuild, guild_id: string) {
  const channelsStockExist = await new HttpUtils().get(
    Routes.GET_CHANNELS_STOCK_EXIST,
    guild.id,
  );

  // logger.debug(channelsStockExist);

  if (!channelsStockExist.data) {
    const channelsStock = await guild.channels.create({
      name: 'Channels Stock',
      type: ChannelType.GuildCategory,
      position: 100,
    });

    logger.info('[Registering category] Register channels stock category');
    await DiscordClient.getInstance(guild_id)
      .getCategoryManager()
      .registerCategory(
        new Category(guild_id, channelsStock.id, channelsStock.name),
      );

    await new HttpUtils().post(
      Routes.REGISTER_CHANNEL_STOCK,
      undefined,
      channelsStock.id,
    );
  }
}

/**
 * Enregistre les channels et les categories dans la base de données
 * @param guild Object guild de discord
 * @param guild_id Identifiant de la guild en base de données
 */
async function registerChannels(guild: DiscordGuild, guild_id: string) {
  // Enregistrement des categories dans la base de données
  new Promise(() => {
    // Recupère la liste des categories
    const categories = getDiscordCategories(guild);

    logger.info(
      '[Registering category] ' +
        ' : Guild => name : ' +
        guild.name +
        ' | id: ' +
        guild.id,
    );
    categories.forEach(async (category) => {
      await DiscordClient.getInstance(guild_id)
        .getCategoryManager()
        .registerCategory(new Category(guild_id, category.id, category.name));
    });

    // Recupère la liste des channels n'étant pas des categories et des threads
    const channels = getDiscordChannels(guild);
    logger.info(
      '[Registering channels] ' +
        ' : Guild => name : ' +
        guild.name +
        ' | id: ' +
        guild.id +
        ' | channels: ' +
        channels.size,
    );

    channels.forEach(async (channel) => {
      setTimeout(async () => {
        const parentId = channel.parentId;

        await DiscordClient.getInstance(guild_id)
          .getChannelManager()
          .registerChannel(
            new Channel(
              channel.id,
              channel.name,
              guild_id,
              parentId === undefined ? parentId : undefined,
            ),
          );
      }, 500);
    });
  });
}


/**
 * Mets à jour le nom des channels et des categories dans la base de données
 * @param guild Object guild de discord
 * @param guild_id Identifiant de la guild en base de données
 */
async function updateChannels(guild: DiscordGuild, guild_id: string) {
  const savedCategories = await DiscordClient.getInstance(guild_id)
    .getGuildManager()
    .getGuildCategories(guild_id);

  const discordCategories = getDiscordCategories(guild);

  const categoriesToUpdate = savedCategories.data.filter((category: any) => {
    const discordCategory = discordCategories.find(
      (channel) => channel.id === category.category_uuid,
    );
    return discordCategory?.name !== category.category_name;
  });

  logger.info(
    '[Update categories] ' +
      ' : Guild => name : ' +
      guild.name +
      ' | id: ' +
      guild.id +
      ' | channels: ' +
      (categoriesToUpdate.size === undefined ? 0 : categoriesToUpdate.size),
  );
  // logger.debug(JSON.stringify(categoriesToUpdate) + ' liste des categories a mettre a jour')

  for (const category of categoriesToUpdate) {
    setTimeout(async () => {
      await DiscordClient.getInstance(guild_id)
        .getCategoryManager()
        .updateCategoryName(
          new Category(
            guild_id,
            category.category_uuid,
            category.category_name,
          ),
        );
    }, 500);
  }

  const savedChannels = await DiscordClient.getInstance(guild_id)
    .getGuildManager()
    .getGuidChannels(guild_id);

  const discordChannels = getDiscordChannels(guild);

  const channelsToUpdate = savedChannels.data.filter((channelPending: any) => {
    const discordChannel = discordChannels.find(
      (channel) => channel.id === channelPending.channel_uuid,
    );
    return discordChannel?.name !== channelPending.channel_name;
  });
  // logger.debug(JSON.stringify(channelsToUpdate) + ' liste des channels a mettre a jour')
  logger.info(
    '[Update channels] ' +
      ' : Guild => name : ' +
      guild.name +
      ' | id: ' +
      guild.id +
      ' | channels: ' +
      (channelsToUpdate.size === undefined ? 0 : channelsToUpdate.size),
  );

  for (const channel of channelsToUpdate) {
    setTimeout(async () => {
      await DiscordClient.getInstance(guild_id)
        .getChannelManager()
        .updateChannelName(
          new Channel(channel.channel_uuid, channel.channel_name, guild_id),
        );
    }, 500);
  }
}

/**
 * Supprime les channels et les categories dans la base de données s'ils n'existent plus sur discord
 * @param guild Object guild de discord
 * @param guild_id Identifiant de la guild en base de données
 */
async function deleteChannels(guild: DiscordGuild) {
  const savedCategories = await DiscordClient.getInstance(guild.id)
    .getGuildManager()
    .getGuildCategories(guild.id);
  const discordCategories = getDiscordCategories(guild);

  const categoriesToDelete = savedCategories.data.filter((category: any) =>
    Array.from(discordCategories.values()).includes(category.category_uuid),
  );
  logger.info(
    '[Delete categories] ' +
      ' : Guild => name : ' +
      guild.name +
      ' | id: ' +
      guild.id +
      ' | channels: ' +
      (categoriesToDelete.size === undefined ? 0 : categoriesToDelete.size),
  );

  for (const category of categoriesToDelete) {
    setTimeout(async () => {
      await DiscordClient.getInstance(guild.id)
        .getCategoryManager()
        .deleteCategory(category.id);
    }, 500);
  }

  const savedChannels = await DiscordClient.getInstance(guild.id)
    .getGuildManager()
    .getGuidChannels(guild.id);

  const discordChannels = getDiscordChannels(guild);

  const channelsToDelete = savedChannels.data.filter((channelPending: any) =>
    Array.from(discordChannels.values()).includes(channelPending.channel_uuid),
  );

  // logger.debug(
  //   JSON.stringify(channelsToDelete) + ' liste des channels a supprimer',
  // );
  logger.info(
    '[Delete channels] ' +
      ' : Guild => name : ' +
      guild.name +
      ' | id: ' +
      guild.id +
      ' | channels: ' +
      (channelsToDelete.size === undefined ? 0 : channelsToDelete.size),
  );

  for (const channel of channelsToDelete) {
    setTimeout(async () => {
      await DiscordClient.getInstance(guild.id)
        .getChannelManager()
        .deleteChannel(channel.id);
    }, 500);
  }
}

async function registerUsers(guild: DiscordGuild, guild_id: string) {
  const users = guild.members.cache.filter((user) => !user.user.bot);
  const userRegistered = await DiscordClient.getInstance(guild_id);
}

function getDiscordCategories(guild: DiscordGuild) {
  return guild.channels.cache.filter(
    (channel) => channel.type === ChannelType.GuildCategory,
  );
}

function getDiscordChannels(guild: DiscordGuild) {
  return guild.channels.cache.filter(
    (channel) =>
      channel.type !== ChannelType.GuildCategory &&
      channel.parent?.type !== ChannelType.GuildText,
  );
}
