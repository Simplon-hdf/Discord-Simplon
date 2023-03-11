import { Events } from "discord.js";
import { DiscordClient } from "../client";
import { Guild, IGuild } from "../guilds/guild";
import { GuildsManager } from "../guilds/guilds-manager";
import { ClientManager } from "../utils/client-manager";
import DiscordEvent from "./DiscordEvent";

export default class ReadyEvent extends DiscordEvent {

  protected type: Events = Events.ClientReady;
  protected method: string = 'once';

  execute(): void {
    const client = ClientManager.get_client();
    console.info('Ready! Logged in as ' + client.user?.tag);
    client.guilds.cache.forEach(async (element) => {
      ClientManager.add_procedureManager(element.id);
      const discordClient: DiscordClient = DiscordClient.getInstance();
      const guildManager: GuildsManager = discordClient.getGuildManager();

      const guild = await guildManager.loadGuild(element.id);

      if (guild === undefined) {
        const newGuild: IGuild = new Guild(
          element.id,
          element.name,
          element.memberCount
        )
        await guildManager.registerGuild(newGuild);
      }

      discordClient.destroy();
    })
  }

}