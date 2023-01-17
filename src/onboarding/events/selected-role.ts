import { Events, GuildInvitableChannelResolvable, RoleSelectMenuInteraction } from "discord.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: RoleSelectMenuInteraction) {
        if (!interaction.isRoleSelectMenu() || interaction['customId'] != 'selected-role') return;
        const selected_role = await interaction.guild?.roles.cache?.get(interaction.values[0]);
        const chan: GuildInvitableChannelResolvable = (await interaction.guild?.channels.cache.get('1064635992398635120')) as GuildInvitableChannelResolvable;
        let invite = await interaction.guild?.invites.create(chan, {
            maxUses: 1,
        });
        console.log(`${invite}`);
        await interaction.reply({ content: `Voici votre lien : ${invite}`, ephemeral: true });
    }
}