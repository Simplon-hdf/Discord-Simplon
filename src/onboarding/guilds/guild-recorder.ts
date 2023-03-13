import { ChannelType, Client, Guild as DiscordGuild } from 'discord.js';
import { Guild, IGuild } from './guild';
import { HttpUtils } from '../utils/http';
import { HttpRoutes } from '../utils/routes/http-routes';
import { Category } from '../channels/category/category';
import { RedisManager } from '../utils/redis-manager';
import { RedisRoutes } from '../utils/routes/redis-routes';
import logger from '../utils/logger';
import { DiscordClient } from '../client';
import { Channel } from '../channels/channel/channel';
import { CategoryManager } from '../channels/category/category-manager';
import { ChannelManager } from '../channels/channel/channel-manager';
import { GuildsManager } from './guilds-manager';
import { RoleManager } from '../roles/role-manager';
import { Role } from '../roles/role';

export class GuildRecorder {
  private readonly discordGuild: DiscordGuild;
  private readonly guildId: string;
  private readonly guildName: string;
  private readonly guild: Guild;

  private readonly categoryManager: CategoryManager;
  private readonly channelManager: ChannelManager;
  private readonly guildManager: GuildsManager;

  private readonly roleManager: RoleManager;

  constructor(discordGuild: DiscordGuild) {
    this.discordGuild = discordGuild;
    this.guildId = discordGuild.id;
    this.guildName = discordGuild.name;
    this.guild = new Guild(
      this.guildId,
      this.guildName,
      this.discordGuild.memberCount,
    );

    this.categoryManager = DiscordClient.getInstance().getCategoryManager();
    this.channelManager = DiscordClient.getInstance().getChannelManager();
    this.guildManager = DiscordClient.getInstance().getGuildManager();
    this.roleManager = DiscordClient.getInstance().getRoleManager();
  }

  async loadAndRegisterGuild(client: Client) {
    DiscordClient.getInstance('channel-create').setClient(client);
    const guildManager: GuildsManager = this.guildManager;

    const guild = await guildManager.loadGuild(this.guildId);

    if (guild.statusCode === 404) {
      // Enregistrement des guilds dans la base de données
      const newGuild: IGuild = new Guild(
        this.guildId,
        this.guildName,
        this.discordGuild.memberCount,
      );

      await guildManager.registerGuild(newGuild);
    }
  }

  /**
   * Enregistre la category de stockage dans la base de données
   * @param guild Object guild de discord
   * @param guild_id Identifiant de la guilde en base de données
   */
  async registerChannelsStock() {
    const channelsStockExist = await new HttpUtils().get(
      HttpRoutes.GET_CHANNELS_STOCK_EXIST,
      this.guildId,
    );

    // logger.debug(channelsStockExist);

    if (!channelsStockExist.data) {
      this.discordGuild.channels
        .create({
          name: 'Channels Stock',
          type: ChannelType.GuildCategory,
          position: 100,
        })
        .then(async (channel) => {
          const category = new Category(this.guildId, channel.id, channel.name);
          await RedisManager.getInstance().set(
            RedisRoutes.LAST_CREATED_CATEGORY,
            JSON.stringify(category),
          );

          await RedisManager.getInstance().set(
            RedisRoutes.LAST_CREATED_CATEGORY,
            JSON.stringify(category),
          );

          logger.info(
            '[Registering category] Register channels stock category',
          );
          await DiscordClient.getInstance(this.guildId)
            .getCategoryManager()
            .registerCategory(category);

          await new HttpUtils().post(
            HttpRoutes.REGISTER_CHANNEL_STOCK,
            undefined,
            channel.id,
          );
        });
    }
  }

  /**
   * Enregistre les channels et les categories dans la base de données
   * @param guild Object guild de discord
   * @param guild_id Identifiant de la guild en base de données
   */
  async registerChannels() {
    // Enregistrement des categories dans la base de données
    new Promise(() => {
      // Recupère la liste des categories
      const categories = this.getDiscordCategories();

      logger.info(
        '[Registering category] ' +
          ' : Guild => name : ' +
          this.guildName +
          ' | id: ' +
          this.guildId,
      );
      categories.forEach(async (category) => {
        await this.categoryManager.registerCategory(
          new Category(this.guildId, category.id, category.name),
        );
      });

      // Recupère la liste des channels n'étant pas des categories et des threads
      const channels = this.getDiscordChannels();
      logger.info(
        '[Registering channels] ' +
          ' : Guild => name : ' +
          this.guildName +
          ' | id: ' +
          this.guildId +
          ' | channels: ' +
          channels.size,
      );

      channels.forEach(async (channel) => {
        setTimeout(async () => {
          const parentId = channel.parentId;

          this.channelManager.registerChannel(
            new Channel(
              channel.id,
              channel.name,
              this.guildId,
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
  async updateChannels() {
    const savedCategories = await this.guildManager.getGuildCategories(
      this.guildId,
    );

    const discordCategories = this.getDiscordCategories();

    const categoriesToUpdate = savedCategories.data.filter((category: any) => {
      const discordCategory = discordCategories.find(
        (channel) => channel.id === category.category_uuid,
      );
      return discordCategory?.name !== category.category_name;
    });

    logger.info(
      '[Update categories] ' +
        ' : Guild => name : ' +
        this.guildName +
        ' | id: ' +
        this.guildId +
        ' | channels: ' +
        (categoriesToUpdate.size === undefined ? 0 : categoriesToUpdate.size),
    );
    // logger.debug(JSON.stringify(categoriesToUpdate) + ' liste des categories a mettre a jour')

    for (const category of categoriesToUpdate) {
      setTimeout(async () => {
        await this.categoryManager.updateCategoryName(
          new Category(
            this.guildId,
            category.category_uuid,
            category.category_name,
          ),
        );
      }, 500);
    }

    const savedChannels = await this.guildManager.getGuidChannels(this.guildId);

    const discordChannels = this.getDiscordChannels();

    const channelsToUpdate = savedChannels.data.filter(
      (channelPending: any) => {
        const discordChannel = discordChannels.find(
          (channel) => channel.id === channelPending.channel_uuid,
        );
        return discordChannel?.name !== channelPending.channel_name;
      },
    );
    // logger.debug(JSON.stringify(channelsToUpdate) + ' liste des channels a mettre a jour')
    logger.info(
      '[Update channels] ' +
        ' : Guild => name : ' +
        this.guildName +
        ' | id: ' +
        this.guildId +
        ' | channels: ' +
        (channelsToUpdate.size === undefined ? 0 : channelsToUpdate.size),
    );

    for (const channel of channelsToUpdate) {
      setTimeout(async () => {
        await this.channelManager.updateChannelName(
          new Channel(channel.channel_uuid, channel.channel_name, this.guildId),
        );
      }, 500);
    }
  }

  /**
   * Supprime les channels et les categories dans la base de données s'ils n'existent plus sur discord
   * @param guild Object guild de discord
   * @param guild_id Identifiant de la guild en base de données
   */
  async deleteChannels() {
    const savedCategories = await this.guildManager.getGuildCategories(
      this.guildId,
    );
    const discordCategories = this.getDiscordCategories();

    const categoriesToDelete = savedCategories.data.filter((category: any) =>
      Array.from(discordCategories.values()).includes(category.category_uuid),
    );
    logger.info(
      '[Delete categories] ' +
        ' : Guild => name : ' +
        this.guildName +
        ' | id: ' +
        this.guildId +
        ' | channels: ' +
        (categoriesToDelete.size === undefined ? 0 : categoriesToDelete.size),
    );

    for (const category of categoriesToDelete) {
      setTimeout(async () => {
        await this.categoryManager.deleteCategory(category.id);
      }, 500);
    }

    const savedChannels = await this.guildManager.getGuidChannels(this.guildId);

    const discordChannels = this.getDiscordChannels();

    const channelsToDelete = savedChannels.data.filter((channelPending: any) =>
      Array.from(discordChannels.values()).includes(
        channelPending.channel_uuid,
      ),
    );

    // logger.debug(
    //   JSON.stringify(channelsToDelete) + ' liste des channels a supprimer',
    // );
    logger.info(
      '[Delete channels] ' +
        ' : Guild => name : ' +
        this.guildName +
        ' | id: ' +
        this.guildId +
        ' | channels: ' +
        (channelsToDelete.size === undefined ? 0 : channelsToDelete.size),
    );

    for (const channel of channelsToDelete) {
      setTimeout(async () => {
        await this.channelManager.deleteChannel(channel.id);
      }, 500);
    }
  }

  async registerRoles() {
    const roles = this.discordGuild.roles.cache;
    logger.info(
      '[Registering roles] ' +
        ' : Guild => name : ' +
        this.guildName +
        ' | id: ' +
        this.guildId +
        ' | roles: ' +
        roles.size,
    );

    for (const role of roles.values()) {
      setTimeout(async () => {
        await this.roleManager.registerRole(
          new Role(role.id, role.name, this.guildId, role.color.toString()),
        );
      }, 500);
    }
  }

  async updateRoles() {
    const savedRoles = await this.roleManager.getRoles(this.guildId);

    const discordRoles = this.discordGuild.roles.cache;

    const rolesToUpdate = savedRoles.data.filter((savedRole: any) => {
      const discordRole = discordRoles.find(
        (role) => role.id === savedRole.role_uuid,
      );
      return discordRole?.name !== savedRole.role_name;
    });

    logger.info(
      '[Update roles] ' +
        ' : Guild => name : ' +
        this.guildName +
        ' | id: ' +
        this.guildId +
        ' | roles: ' +
        (rolesToUpdate.size === undefined ? 0 : rolesToUpdate.size),
    );

    for (const role of rolesToUpdate) {
      setTimeout(async () => {
        await this.roleManager.updateRole(
          new Role(
            role.role_uuid,
            role.role_name,
            this.guildId,
            role.role_color,
          ),
        );
      }, 500);
    }
  }

  async deleteRoles() {
    const savedRoles = await this.roleManager.getRoles(this.guildId);

    const discordRoles = this.discordGuild.roles.cache;

    const rolesToDelete = savedRoles.data.filter((savedRole: any) =>
      Array.from(discordRoles.values()).includes(savedRole.role_uuid),
    );

    logger.info(
      '[Delete roles] ' +
        ' : Guild => name : ' +
        this.guildName +
        ' | id: ' +
        this.guildId +
        ' | roles: ' +
        (rolesToDelete.size === undefined ? 0 : rolesToDelete.size),
    );

    for (const role of rolesToDelete) {
      setTimeout(async () => {
        await this.roleManager.deleteRole(role.id);
      }, 500);
    }
  }

  getDiscordCategories() {
    return this.discordGuild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildCategory,
    );
  }

  getDiscordChannels() {
    return this.discordGuild.channels.cache.filter(
      (channel) =>
        channel.type !== ChannelType.GuildCategory &&
        channel.parent?.type !== ChannelType.GuildText,
    );
  }
}
