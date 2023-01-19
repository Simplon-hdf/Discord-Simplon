import { TextChannel } from "discord.js";

export const remove_id_message_interactions = async (interaction, message_id, content) => {

    const channel : TextChannel = await interaction.guild.channels.resolve('1065212511714017340')?.fetch() as TextChannel;
    const identification_mannagement_message = await channel.messages.fetch(message_id);
    await identification_mannagement_message.edit({content: content, embeds: identification_mannagement_message.embeds, components:[]});

}