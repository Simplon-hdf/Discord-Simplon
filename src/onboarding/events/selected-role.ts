import { Events, GuildInvitableChannelResolvable, Role, RoleSelectMenuInteraction } from "discord.js";
import { set } from "../utils/json_utils.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    async execute(interaction: RoleSelectMenuInteraction) {

        const pathToSave = './generated-links.json';
        if (!interaction.isRoleSelectMenu() || interaction['customId'] != 'selected-role') return;
        const selected_role = await interaction.guild?.roles.cache?.get(interaction.values[0]) as Role;
        const chan: GuildInvitableChannelResolvable = (await interaction.guild?.channels.cache.get('1064635992398635120')) as GuildInvitableChannelResolvable;
        let invite = await interaction.guild?.invites.create(chan, {
            maxUses: 1,
        });
        console.log(`${invite}`);

        console.log(`Role ${selected_role['id']}`);

        const new_link = {
            invite: selected_role['id']
        }
        set(pathToSave, 'test', new_link);

        //1064644732715815036

        await interaction.reply({ content: `Voici votre lien : ${invite}`, ephemeral: true });
    }
}