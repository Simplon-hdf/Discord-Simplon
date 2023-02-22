import { ButtonInteraction, Events, GuildMember, GuildMemberRoleManager, Message } from "discord.js";
import { get } from '../../../utils/json_utils.js'
import { remove_id_message_interactions, remove_id_request } from '../../../utils/identification/utils.js'
import { RolesIds } from "../../../utils/enums.js";

export default {
    name: Events.InteractionCreate,
    on: true,
    used_file: './identifications-requests.json',
    async execute(interaction: ButtonInteraction) {
        if (interaction.guild == null) return;
        if (!interaction.isButton() || interaction.customId != 'reject-id-req') return;
        const member_roles: GuildMemberRoleManager = (await interaction.member?.roles) as GuildMemberRoleManager;
        if (member_roles.cache.get(RolesIds.CAP_Role) == undefined) return;

        const id_requests = await get(this.used_file);
        const id_request = id_requests[interaction.message.id];
        const member: GuildMember = (await interaction.guild.members.fetch())?.get(id_request['user_id']) as GuildMember;

        remove_id_request(this.used_file, member, id_requests);
        const reply_msg: Message = await interaction.message.channel.send(`La demande d'identification du membre ${id_request['lastname']} ${id_request['firstname']} a bien été refusée`);
        setTimeout(async () => {
            try {
                await reply_msg.delete();
            } catch { }
        }, 5000);
        member.send('Votre demande d\'identification à été rejetée');
        interaction.message.delete();
        await interaction.deferUpdate();
    }
}