import { ActionRowBuilder, ButtonInteraction, EmbedBuilder, Events, GuildMember, GuildMemberManager, GuildMemberRoleManager, Role, RoleSelectMenuBuilder, StringSelectMenuBuilder, User } from "discord.js";
import { get, set } from '../utils/json_utils.js'

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: ButtonInteraction) {
        if(interaction.guild == null) return;
        if ((!interaction.isButton() || interaction.customId != 'accept-id-req')) return;
        const member_roles: GuildMemberRoleManager = (await interaction.member?.roles) as GuildMemberRoleManager;
        if (member_roles.cache.get('1065224602613186600') == undefined) return;

        const guild_roles = await interaction.guild.roles.fetch();

        const formations = (await get('./config_courses.json'))['formations'];

        const learner_roles : String[] = [];

        for(const formation in formations) {
            for(const role_name of formations[formation]['promos']) {
                learner_roles.push(role_name);
            }
        }

        const roles_to_display = new StringSelectMenuBuilder()
            .setCustomId('attributed-role-id')
            .setMinValues(1)
            .setPlaceholder('Choisis un rôle')
            .setMaxValues(1);

        guild_roles.filter(role => learner_roles.includes(role.name)).forEach(role => {
            roles_to_display.addOptions({
                label: role.name,
                value: role.id
            });
        });

        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
               roles_to_display
            );
        await interaction.reply({content: 'Choisis le rôle à attribuer au nouvel apprenant', ephemeral:true, components:[row]});
    }
}