import { Events, Guild, GuildMember, StringSelectMenuInteraction, TextChannel } from 'discord.js'
import { get } from '../../../utils/json_utils.js'
import { remove_id_message_interactions, remove_id_request } from '../../../utils/identification/utils.js'
import { RolesIds } from '../../../utils/enums.js'

export default {
    name: Events.InteractionCreate,
    on: true,
    used_file: './identifications-requests.json',
    async execute(interaction: StringSelectMenuInteraction) {
        if(interaction.guild == null) return;
        if(!interaction.isStringSelectMenu() || interaction.customId != 'attributed-role-id') return;
        const role_id = interaction.values[0].split('|')[0];
        const message_id = interaction.values[0].split('|')[1];
        const id_requests = await get(this.used_file);
        const id_request = id_requests[message_id];
        const member : GuildMember = (await interaction.guild.members.fetch())?.get(id_request['user_id']) as GuildMember;

        remove_id_message_interactions(interaction, message_id, `La demande d'identification a été validée par ${interaction.member?.user.username}`);
        member.roles.add(role_id);
        member.setNickname(`${id_request['firstname']} ${id_request['lastname']}`);

        if(member.roles.cache.get(RolesIds.Unverified_User_Role))
            await member.roles.remove(RolesIds.Unverified_User_Role);

        await remove_id_request(this.used_file, member, id_requests);
        await member.send('Votre demande d\'identification a été acceptée !');
        await interaction.reply({content: `La demande d'identification du membre ${id_request['lastname']} ${id_request['firstname']} a bien été acceptée`, ephemeral:true});
    }
}