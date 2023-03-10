import { Events, GuildMember, InteractionResponse, StringSelectMenuInteraction } from 'discord.js'
import { get } from '../../../utils/json_utils.js'
import { remove_id_message_interactions, remove_id_request } from '../../../utils/identification/utils.js'
import { RolesIds } from '../../../utils/enums.js'

export default {
    name: Events.InteractionCreate,
    on: true,
    used_file: './identifications-requests.json',
    async execute(interaction: StringSelectMenuInteraction) {
        if (interaction.guild == null) return;
        if (!interaction.isStringSelectMenu() || interaction.customId != 'attributed-role-id') return;
        
        const role_id = interaction.values[0].split('|')[0];
        const message_id = interaction.values[0].split('|')[1];
        const id_requests = await get(this.used_file);
        const id_request = id_requests[message_id];
        const member: GuildMember = (await interaction.guild.members.fetch())?.get(id_request['user_id']) as GuildMember;

        await member.roles.add(role_id);

        try {
            await member.setNickname(`${id_request['firstname']} ${id_request['lastname']}`);
        } catch { }
        if (member.roles.cache.get(RolesIds.Unverified_User_Role))
            await member.roles.remove(RolesIds.Unverified_User_Role);

        remove_id_request(this.used_file, member, id_requests);
        member.send('Votre demande d\'identification a été acceptée !');
        const reply_msg = await interaction.message.channel.send(`La demande d'identification du membre ${id_request['lastname']} ${id_request['firstname']} a bien été acceptée`);
        setTimeout(async () => {
            try {
                await reply_msg.delete();
            } catch { }
        }, 5000);
        interaction.message.delete();
        await interaction.deferUpdate();
    }
}