import { EmbedBuilder, Events, GuildMember, GuildMemberRoleManager, RoleManager, StringSelectMenuInteraction, TextInputBuilder, TextInputStyle } from "discord.js"
import { set, get } from "../../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: StringSelectMenuInteraction) {
        if (!interaction.isStringSelectMenu() || interaction['customId'] != 'onboarding-selector') return;

        const data = await get('./config_courses.json');

        const formation_data = data['formations'];
        const promos_from_data : string[] = []

        const keys_formations = Object.keys(formation_data);

        keys_formations.forEach(key => {
            const p = formation_data[key];

            p['promos'].forEach(name => {
                promos_from_data.push(name);
            });
        });

        const promos = interaction.values;

        const user_id = interaction.user.id;
        const members : GuildMember = (await interaction.guild?.members.fetch())?.get(user_id) as GuildMember;
        const role_manager : GuildMemberRoleManager = members.roles;
        const role_server : RoleManager = await interaction.guild?.roles!;
        const roles = role_manager?.cache;
        // remove roles to user if roles is promo and if is deselect
        roles?.forEach(role => {
            if(!promos.includes(role.name) && promos_from_data.includes(role.name)){
                role_manager?.remove(role);
            }
        })

        promos.forEach(async name => {
            const role = await (await role_server.fetch()).find(role => role.name == name);
            role_manager?.add(role?.id!);
        })

        await interaction.reply('Vous povez voir les promos selectionées');
        setTimeout(async () => await interaction.deleteReply(), 4000);

    }
}