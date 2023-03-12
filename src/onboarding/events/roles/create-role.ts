import { Events, Interaction } from 'discord.js';

import DiscordEvent from '../discord-event';

export default class RoleCreateEvent extends DiscordEvent {
  protected data: any;
  protected type: Events = Events.GuildRoleCreate;
  protected method = 'on';

  async execute(interaction: Interaction) {}
}
