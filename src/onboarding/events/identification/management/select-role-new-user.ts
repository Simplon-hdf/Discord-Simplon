import { Events, Guild, GuildMember, StringSelectMenuInteraction, TextChannel } from 'discord.js'
import { get, set, redefine } from '../../../utils/json_utils.js'
import { remove_id_message_interactions } from '../../../utils/identification/utils.js'


export default {
    name: Events.InteractionCreate,
    on: true,
    usable_file: './identifications-requests.json',
    async execute(interaction: StringSelectMenuInteraction) {
        if(interaction.guild == null) return;
        if(!interaction.isStringSelectMenu() || interaction.customId != 'attributed-role-id') return;
        const role_id = interaction.values[0].split('|')[0];
        const message_id = interaction.values[0].split('|')[1];

        const id_requests = await get(this.usable_file);
        const id_request = id_requests[message_id];
        
        const member : GuildMember = (await interaction.guild.members.fetch())?.get(id_request['user_id']) as GuildMember;

        remove_id_message_interactions(interaction, message_id, `La demande d'identification a été validée par ${interaction.member?.user.username}`);

        member.roles.add(role_id);
        member.setNickname(`${id_request['firstname']} ${id_request['lastname']}`);
        await member.send('Votre demande d\'identification a été acceptée !');

        let new_requests_ids = {};

        for(const request in id_requests) {
            if(id_requests[request]['user_id'] != member.user.id) {
                new_requests_ids[request] = id_requests[request];
            }
        }

        redefine(this.usable_file, new_requests_ids);

        await interaction.reply({content: `La demande d'identification du membre ${id_request['lastname']} ${id_request['firstname']} a bien été acceptée`, ephemeral:true});
    }
}