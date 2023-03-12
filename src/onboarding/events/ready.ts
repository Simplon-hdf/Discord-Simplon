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
import DiscordEvent from './discord-event';
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

    await this.deleteGuilds(client);

    for (const element of guilds.values()) {
      const guildRecorder: GuildRecorder = new GuildRecorder(element);

      await guildRecorder.loadAndRegisterGuild(client);
      await guildRecorder.registerChannelsStock();
      await guildRecorder.registerChannels();
      await guildRecorder.updateChannels();
      await guildRecorder.deleteChannels();
    }
  }

  async deleteGuilds(client: Client) {
    const guilds = await DiscordClient.getInstance()
      .getGuildManager()
      .getGuilds();
    const guildsDiscord = client.guilds.cache;
    for (const guild of guilds) {
      if (!guildsDiscord.has(guild.guild_uuid)) {
        logger.info(
          '[Delete guild] ' + guild.guild_name + ' [' + guild.guild_uuid + ']',
        );
        await DiscordClient.getInstance()
          .getGuildManager()
          .deleteGuild(guild.guild_uuid);
      }
    }
  }
}
