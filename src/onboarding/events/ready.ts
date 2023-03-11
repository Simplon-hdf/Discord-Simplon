import { ChannelType, Client, Events, Guild as DiscordGuild } from 'discord.js';
import { DiscordClient } from '../client';
import { GuildsManager } from '../guilds/guilds-manager';
import { Guild, IGuild } from '../guilds/guild';
import logger from '../utils/logger';
import { HttpUtils } from '../utils/http';
import { HttpRoutes } from '../utils/routes/http-routes';
import { Category } from '../channels/category/category';
import { Channel } from '../channels/channel/channel';
import { User } from '../users/user';
import EventEmitter from 'events';
import { RedisManager } from '../utils/redis-manager';
import { RedisRoutes } from '../utils/routes/redis-routes';
import DiscordEvent from './DiscordEvent';
import { ClientManager } from '../utils/client-manager';
import { GuildRecorder } from '../guilds/guild-recorder';

export default class ReadyEvent extends DiscordEvent {
  protected data: any;
  protected type: Events = Events.ClientReady;
  protected method = 'once';

  async execute() {
    const client = ClientManager.get_client();
    logger.info('Ready! Logged in as ' + client.user?.tag);
    await RedisManager.getInstance().connect();
    const guilds = client.guilds.cache;

    for (const element of guilds.values()) {
      const discordClient: DiscordClient = DiscordClient.getInstance(
        element.id,
      );
      DiscordClient.getInstance('channel-create').setClient(client);
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

      const guildRecorder: GuildRecorder = new GuildRecorder(element);

      await guildRecorder.registerChannelsStock();
      await guildRecorder.registerChannels();
      await guildRecorder.updateChannels();
      await guildRecorder.deleteChannels();

      discordClient.destroy();
    }
  }
}
