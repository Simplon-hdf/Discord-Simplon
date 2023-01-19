import { ButtonInteraction, Events, GuildMember, GuildMemberRoleManager } from "discord.js";
import { get } from '../../../utils/json_utils.js'
import { remove_id_message_interactions, remove_id_request } from '../../../utils/identification/utils.js'
import { RolesIds } from "../../../utils/enums.js";

export default {
    name : Events.InteractionCreate,
    on: true,
    used_file: './identifications-requests.json',
    async execute(interaction: ButtonInteraction) {
        if(interaction.guild == null) return;
        if(!interaction.isButton() || interaction.customId != 'reject-id-req') return;
        const member_roles: GuildMemberRoleManager = (await interaction.member?.roles) as GuildMemberRoleManager;
        if (member_roles.cache.get(RolesIds.CAP_Role) == undefined) return;

        const id_requests = await get(this.used_file);
        const id_request = id_requests[interaction.message.id];
        const member : GuildMember = (await interaction.guild.members.fetch())?.get(id_request['user_id']) as GuildMember;

        await remove_id_message_interactions(interaction, interaction.message.id, `La demande d'identification a été refusée par ${interaction.member?.user.username}`);
        await remove_id_request(this.used_file, member, id_requests);
        await member.send('Votre demande d\'identification à été rejetée');
        await interaction.reply({content: `La demande d'identification du membre ${id_request['lastname']} ${id_request['firstname']} a bien été refusée`, ephemeral:true});
    }
}