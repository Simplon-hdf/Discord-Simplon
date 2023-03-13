import { Events, Role as DiscordRole } from 'discord.js';

import DiscordEvent from '../discord-event';
import { DiscordClient } from '../../client';
import { Role } from '../../roles/role';

export default class CreateRoleEvent extends DiscordEvent {
  protected data: any;
  protected type: Events = Events.GuildRoleCreate;
  protected method = 'on';

  async execute(roles: DiscordRole[]) {
    const role = roles[0];
    const guild = role.guild.id;
    const id = role.id;
    const name = role.name;
    const color = role.color;

    await DiscordClient.getInstance()
      .getRoleManager()
      .registerRole(new Role(name, id, guild, color.toString()));
  }
}
