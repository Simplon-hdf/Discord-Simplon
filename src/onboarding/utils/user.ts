import { CommandInteraction, GuildMember, Interaction } from 'discord.js';

export function getUserRolesByInteraction(interaction: Interaction): string[] {
  return (
    interaction.guild?.members.cache.get(
      interaction.user.id,
    ) as GuildMember as any
  )['_roles'];
}
export function getUserRolesByCommandInteraction(
  interaction: CommandInteraction,
): string[] {
  return (
    interaction.guild?.members.cache.get(
      interaction.user.id,
    ) as GuildMember as any
  )['_roles'];
}
