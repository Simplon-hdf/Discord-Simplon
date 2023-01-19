import { GuildMember, TextChannel } from "discord.js";
import { redefine } from "../json_utils.js";

export const remove_id_message_interactions = async (interaction, message_id, content) => {

    const channel : TextChannel = await interaction.guild.channels.resolve('1065212511714017340')?.fetch() as TextChannel;
    const identification_mannagement_message = await channel.messages.fetch(message_id);
    await identification_mannagement_message.edit({content: content, embeds: identification_mannagement_message.embeds, components:[]});

}

export const remove_id_request = async(file_path: string, member : GuildMember, id_requests) => {
    let new_requests_ids = {};

    for(const request in id_requests) {
        if(id_requests[request]['user_id'] != member.user.id) {
            new_requests_ids[request] = id_requests[request];
        }
    }
    redefine(file_path, new_requests_ids);
}