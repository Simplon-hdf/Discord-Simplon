import { CommandInteraction, SlashCommandBuilder, Message, MessageManager } from "discord.js";

export default {
    data : new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Permet de supprimer tout les messages dans un channel'),
    async execute(interaction : CommandInteraction){
        if(!interaction.isChatInputCommand()) return;

        const channel = interaction.channel;

        const messages = await channel?.messages.fetch();

        messages?.forEach(async (message : Message) => {
            await message.delete();
        })

        await interaction.reply('message as been deleted');
        setTimeout(async () => await interaction.deleteReply(), 3000);
    }
}