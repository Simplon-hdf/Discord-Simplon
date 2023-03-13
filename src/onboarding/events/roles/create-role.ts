import { Events, Role } from 'discord.js';

import DiscordEvent from '../discord-event';

export default class CreateRoleEvent extends DiscordEvent {
  protected data: any;
  protected type: Events = Events.GuildRoleCreate;
  protected method = 'on';

  async execute(role: Role[]) {
    console.log(role[0].name);
  }
}
